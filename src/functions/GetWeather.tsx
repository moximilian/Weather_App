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
    error:string,
}
export default async function GetWeather(data: { city: string }): Promise<IWeather> {


    const city = data.city
    const apiKey = 'sDFA8fVkJ14CcU/ldssVJA==3RembhHoW61D2auk';
    const url = 'https://api.api-ninjas.com/v1/weather?city='+city;
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('X-Api-Key', apiKey)

    const request:RequestInfo = new Request(url,{
        method:"GET",
        headers:headers
    })
    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as IWeather
        })
}