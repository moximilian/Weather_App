export interface IWeather {
    cloud_pct: number
    temp: number
    feels_like: number
    humidity: number
    min_temp: number
    max_temp: number
    wind_speed: number
    wind_degrees: number
    sunrise: number
    sunset: number
    error: string
}
export interface ICity {
    city: string
}
export interface ICoords {
    lon: number
    lat: number
}
export interface MapProps {
    show: string
}
export interface ICoordResult {
    [index: number]: {
        name: string
        latitude: number
        longitude: number
        country: string
        population: number
        is_capital: boolean
    }
}
export interface ICityResult {
    [index: number]: {
        country: string
        name: string
        state: string
    }
}
export interface ITimezone {
    timezone: string
    city: string
}
export interface MapProps {
    show: string
}
export interface TimeRange {
    [key: string]: (number[] | ((hour: number) => boolean))[]
}
