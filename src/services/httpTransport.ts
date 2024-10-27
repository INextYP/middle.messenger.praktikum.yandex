enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method?: METHOD
    data?: unknown
    withCredentials?: boolean
    responseType?: XMLHttpRequestResponseType
    headers?: Record<string, unknown>
    timeout?: number
}

type OptionsWithoutMethod = Omit<Options, 'method'>

type HTTPMethod<OptionsType = Options, RequestType = unknown> = (
    url: string,
    options?: OptionsType,
) => Promise<RequestType>

export class HTTPTransport {
    private readonly baseUrl: string

    constructor(baseUrl = '') {
        this.baseUrl = baseUrl
    }

    request = <ResponseType = unknown>(
        url: string,
        options: Options = { method: METHOD.GET },
    ): Promise<ResponseType> => {
        const {
            method,
            data,
            withCredentials = true,
            responseType = 'json',
            timeout = 60000,
            headers,
        } = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method as string, `${this.baseUrl}${url}`)

            xhr.onload = function () {
                resolve(xhr.response)
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            xhr.withCredentials = withCredentials
            xhr.responseType = responseType
            xhr.timeout = timeout

            Object.keys(headers ?? {}).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value)
            })

            if (data instanceof FormData) {
                xhr.send(data)
            } else if (method === METHOD.GET || !data) {
                xhr.send()
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(data))
            }
        })
    }

    public get = <ResponseType = unknown>(
        url: string,
        options: OptionsWithoutMethod = {},
        queryParams?: Record<string, string | number>,
    ): Promise<ResponseType> => {
        if (queryParams) {
            const queryString = this._encodeQueryParams(queryParams)
            url += queryString
        }
        return this.request<ResponseType>(url, {
            ...options,
            method: METHOD.GET,
        })
    }

    public post = <ResponseType = unknown>(
        url: string,
        options: Options = {},
    ): Promise<ResponseType> => {
        return this.request<ResponseType>(url, {
            ...options,
            method: METHOD.POST,
        })
    }

    public put = <ResponseType = unknown>(
        url: string,
        options: Options = {},
    ): Promise<ResponseType> => {
        return this.request<ResponseType>(url, {
            ...options,
            method: METHOD.PUT,
        })
    }

    public patch: HTTPMethod = (url, options = { method: METHOD.PATCH }) => {
        return this.request(url, options)
    }

    public delete: HTTPMethod = (url, options = { method: METHOD.DELETE }) => {
        return this.request(url, options)
    }

    private _encodeQueryParams(params: Record<string, string | number>) {
        const query = Object.keys(params)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(params[key]),
            )
            .join('&')
        return query ? `?${query}` : ''
    }
}
