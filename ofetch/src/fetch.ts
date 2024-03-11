import type { $Fetch, CreateFetchOptions, FetchContext } from "./types"
import { withBase, withQuery } from "ufo";
import { isJSONSerializable, isPayloadMethod, mergeFetchOptions } from "./utils";
import type { Readable } from "node:stream";


export function createFetch(globalOptions: CreateFetchOptions = {}): $Fetch {
  const {
    fetch = uni.request,
    Headers = {},
  } = globalOptions;

  const $fetchRaw: $Fetch["raw"] = async function (_request,
    _options = {}) {
    const context: FetchContext = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: undefined,
      error: undefined
    };

    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query,
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        // Set Content-Type and Accept headers to application/json by default
        // for JSON serializable request bodies.
        // Pass empty object as older browsers don't support undefined.
        context.options.headers = context.options.headers || {};
        if (!context.options.headers.hasOwn("content-type")) {
          Object.defineProperty(context.options.headers, "content-type", {
            value: "application/json",
            enumerable: true,
          })
        }
        if (!context.options.headers.hasOwn("accept")) {
          Object.defineProperty(context.options.headers, "accept", {
            value: "application/json",
            enumerable: true,
          })
        }
      } else if (
        // ReadableStream Body
        ("pipeTo" in (context.options.body as ReadableStream) &&
          typeof (context.options.body as ReadableStream).pipeTo ===
          "function") ||
        // Node.js Stream Body
        typeof (context.options.body as Readable).pipe === "function"
      ) {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    try {
      context.response = await fetch({ url: context.request, ...context.options });
    } catch (error) {
      context.error = error as Error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context as any);
      }
      throw error;
    }
    return context.response;
  }

  const $fetch = async function $fetch(request, options) {
    const r = await $fetchRaw(request, options);
    return r.data;
  } as $Fetch;

  $fetch.create = (defaultOptions = {}) =>
    createFetch({
      ...globalOptions,
      defaults: {
        ...globalOptions.defaults,
        ...defaultOptions,
      },
    });

  return $fetch;
}