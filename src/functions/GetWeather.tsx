interface IWeather {
    cloud_pct: number,
    temp: number,
    feels_like: number,
    humidity: number,
    min_temp: number,
    max_temp: number,
    wind_speed: number,
    wind_degrees: number,
    sunrise: number,
    sunset: number,
    error: string,
}
interface ICity {
    city: string;
}
interface ICoords {
    lon: number;
    lat: number
}
export default async function GetWeather(data: ICoords | ICity): Promise<IWeather> {
    var url: string = ''
    if ('city' in data) {
        url = 'https://api.api-ninjas.com/v1/weather?city=' + data.city;
    } else {
        url = 'https://api.api-ninjas.com/v1/weather?lat=' + data.lat + '&lon=' + data.lon;
    }
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
            return res as IWeather
        })
}