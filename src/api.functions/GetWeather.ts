import fetchRequest from './api.help'
import { IWeather } from '../help/inertfaces'

export default async function GetWeather(lat: string, lon: string) {
    return await fetchRequest('weather', {lat, lon}) as IWeather
}

