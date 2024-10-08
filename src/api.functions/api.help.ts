export default async function fetchRequest(path: string, params: object) {
    const transformParams = (params: Array<any>) => {
        const paramsNew = params
            .map(item => {
                return Object.keys(item)
                    .map(key => `${key}=${item[key]}`)
                    .join('&')
            })
            .join('&')
        return paramsNew
    }
    if (!params || Object.values(params).includes(undefined)) {
        console.warn(`Failed fetch for ${path} with params ${JSON.stringify(params)}`)
        return {}
    }
    const baseUrl = `https://api.api-ninjas.com/v1/${path}?${transformParams([params])}`
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('X-Api-Key', 'sDFA8fVkJ14CcU/ldssVJA==3RembhHoW61D2auk')
    const request: RequestInfo = new Request(baseUrl, {
        method: 'GET',
        headers: headers,
    })
    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as any
        })
}
