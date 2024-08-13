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

export class HTTPTransport {
    request(
        url: string,
        options: Options = { method: METHOD.GET },
    ): Promise<XMLHttpRequest> {
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

    public get(
        url: string,
        options: OptionsWithoutMethod = {},
        queryParams?: Record<string, string | number>,
    ): Promise<XMLHttpRequest> {
        if (queryParams) {
            const queryString = this._encodeQueryParams(queryParams)
            url += queryString
        }
        return this.request(url, { ...options, method: METHOD.GET })
    }

    public post(url: string, options: Options = { method: METHOD.POST }) {
        return this.request(url, options)
    }

    public put(url: string, options: Options = { method: METHOD.PUT }) {
        return this.request(url, options)
    }

    public patch(url: string, options: Options = { method: METHOD.PATCH }) {
        return this.request(url, options)
    }

    public delete(url: string, options: Options = { method: METHOD.DELETE }) {
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
