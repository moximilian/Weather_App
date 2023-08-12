interface ICity {
    [index: number]: {
        country: string,
        name: string,
        state: string,
    }

}
export default async function GetCoords(data: { lat: number, lon: number }) {
    var url: string = ''

    url = 'https://api.api-ninjas.com/v1/reversegeocoding?lat=' + data.lat + '&lon=' + data.lon;
    const apiKey = 'sDFA8fVkJ14CcU/ldssVJA==3RembhHoW61D2auk';
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('X-Api-Key', apiKey)
    const request: RequestInfo = new Request(url, {
        method: "GET",
        headers: headers
    })
    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as ICity
        })
}
