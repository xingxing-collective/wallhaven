
export type RequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

type FetchResponse<T> = {
    [key in keyof Omit<UniNamespace.RequestSuccessCallbackResult, 'data'>]: UniNamespace.RequestSuccessCallbackResult[key];
} & {
    data: T
}

export function ofetch<T>(options: string, method: RequestMethod): Promise<FetchResponse<T>>;
export function ofetch<T>(options: string): Promise<FetchResponse<T>>;
export function ofetch<T>(options: string | UniApp.RequestOptions, method: RequestMethod = 'GET') {
    if (typeof options === 'string') {
        return uni.request({
            url: options,
            method
        }) as Promise<FetchResponse<T>>
    }
    return uni.request(options) as Promise<FetchResponse<T>>
}
