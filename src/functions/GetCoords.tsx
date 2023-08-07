interface ICoords {
    [index: number]:{
    name: string,
    latitude: number,
    longitude: number,
    country: string,
    population: number,
    is_capital: boolean,
    }

}
interface ICoordsShort {
    lon: number,
    lat: number,
}


export default async function GetCoords(city: string) {
    var url: string = ''

    url = 'https://api.api-ninjas.com/v1/city?name=' + city;

    // const city = data.city
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
            return res as ICoords
        })
}
