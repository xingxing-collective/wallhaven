// --------------------------
// $fetch API
// --------------------------
export interface $Fetch {
    <T = any, R extends ResponseType = "json">(
        request: FetchRequest,
        options?: FetchOptions<R>
    ): Promise<MappedResponseType<R, T>>;
    raw<T = any, R extends ResponseType = "json">(
        request: FetchRequest,
        options?: FetchOptions<R>
    ): Promise<FetchResponse<MappedResponseType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
}

// --------------------------
// Context
// --------------------------

export interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: FetchRequest;
    // eslint-disable-next-line no-use-before-define
    options: FetchOptions<R>;
    response?: FetchResponse<T>;
    error?: Error;
}

// --------------------------
// Response Types
// --------------------------

export interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
}

export type ResponseType = keyof ResponseMap | "json";

export type MappedResponseType<
    R extends ResponseType,
    JsonType = any,
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export interface FetchResponse<T> extends Omit<UniApp.RequestSuccessCallbackResult, 'data'> {
    data?: T;
}

// --------------------------
// Options
// --------------------------
export interface FetchOptions<R extends ResponseType = ResponseType>
    extends Omit<UniApp.RequestOptions, 'url' | 'responseType' | 'method'> {
    baseURL?: string;
    params?: Record<string, any>;
    query?: Record<string, any>;
    responseType?: R;
    body?:  Record<string, any>;
    headers?: UniApp.RequestOptions['header'];
    method?: UniApp.RequestOptions['method'];
    /**
     * @experimental Set to "half" to enable duplex streaming.
     * Will be automatically set to "half" when using a ReadableStream as body.
     * https://fetch.spec.whatwg.org/#enumdef-requestduplex
     */
    duplex?: "half" | undefined;
    retry?: number | false;
    /** Delay between retries in milliseconds. */
    retryDelay?: number;
    /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
    retryStatusCodes?: number[];

    onRequest?(context: FetchContext): Promise<void> | void;
    onRequestError?(
        context: FetchContext & { error: Error }
    ): Promise<void> | void;
    onResponse?(
        context: FetchContext & { response: FetchResponse<R> }
    ): Promise<void> | void;
    onResponseError?(
        context: FetchContext & { response: FetchResponse<R> }
    ): Promise<void> | void;
}

export interface CreateFetchOptions {
    // eslint-disable-next-line no-use-before-define
    defaults?: FetchOptions;
    fetch?: Fetch;
    Headers?:  UniApp.RequestOptions['header'];
    AbortController?: typeof AbortController;
}

// --------------------------
// Other types
// --------------------------

export type Fetch = typeof uni.request;

export type FetchRequest = string;

