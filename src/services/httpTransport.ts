enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method: METHOD
    data?: unknown
}

type OptionsWithoutMethod = Omit<Options, 'method'>

type HTTPMethod<OptionsType = Options, RequestType = unknown> = (
    url: string,
    options?: OptionsType,
) => Promise<RequestType>

export class HTTPTransport {
    request: HTTPMethod<Options, XMLHttpRequest> = (
        url,
        options = { method: METHOD.GET },
    ) => {
        const { method, data } = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)

            xhr.onload = function () {
                resolve(xhr)
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHOD.GET || !data) {
                xhr.send()
            } else {
                xhr.send(data as Document | XMLHttpRequestBodyInit)
            }
        })
    }

    public get: HTTPMethod<OptionsWithoutMethod> = (
        url,
        options = {},
        queryParams?: Record<string, string | number>,
    ) => {
        if (queryParams) {
            const queryString = this._encodeQueryParams(queryParams)
            url += queryString
        }
        return this.request(url, { ...options, method: METHOD.GET })
    }

    public post: HTTPMethod = (url, options = { method: METHOD.POST }) => {
        return this.request(url, options)
    }

    public put: HTTPMethod = (url, options = { method: METHOD.PUT }) => {
        return this.request(url, options)
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
