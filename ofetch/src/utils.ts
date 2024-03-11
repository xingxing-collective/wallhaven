import { FetchOptions } from "./types";

const payloadMethods = new Set(
    Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
export function isPayloadMethod(method = "GET") {
    return payloadMethods.has(method.toUpperCase());
}

export function isJSONSerializable(value: any) {
    if (value === undefined) {
        return false;
    }
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean" || t === null) {
        return true;
    }
    if (t !== "object") {
        return false; // bigint, function, symbol, undefined
    }
    if (Array.isArray(value)) {
        return true;
    }
    if (value.buffer) {
        return false;
    }
    return (
        (value.constructor && value.constructor.name === "Object") ||
        typeof value.toJSON === "function"
    );
}

// Merging of fetch option objects.
export function mergeFetchOptions(
    input: FetchOptions | undefined,
    defaults: FetchOptions | undefined,
    Headers = {}
): FetchOptions {
    const merged: FetchOptions = {
        ...defaults,
        ...input,
    };

    // Merge params and query
    if (defaults?.params && input?.params) {
        merged.params = {
            ...defaults?.params,
            ...input?.params,
        };
    }
    if (defaults?.query && input?.query) {
        merged.query = {
            ...defaults?.query,
            ...input?.query,
        };
    }

    // Merge headers
    if (defaults?.headers && input?.headers) {
        merged.headers = {};
        for (const [key, value] of input.headers) {
            Object.defineProperty(merged.headers, key, {
                value,
                enumerable: true,
            })
        }
    }

    return merged;
}
