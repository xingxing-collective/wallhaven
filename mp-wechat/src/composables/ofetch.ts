
export type RequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

type FetchResponse<T> = {
    [key in keyof Omit<UniApp.RequestSuccessCallbackResult, 'data'>]: UniApp.RequestSuccessCallbackResult[key];
} & {
    data: T
}

type FetchRequest = {
    [key in keyof UniApp.RequestOptions]: UniApp.RequestOptions[key]
}

export function ofetch<T>(options: string): Promise<FetchResponse<T>>;
export function ofetch<T>(options: string, method: RequestMethod): Promise<FetchResponse<T>>;
export function ofetch<T>(options: FetchRequest): Promise<FetchResponse<T>>;
export function ofetch<T>(options: string | FetchRequest, method: RequestMethod = 'GET') {
    if (typeof options === 'string') {
        return uni.request({
            url: options,
            method
        }) as Promise<FetchResponse<T>>
    }
    return uni.request(options) as Promise<FetchResponse<T>>
}