import fetchRequest from './api.help'
export default async function GetTimezone(lat: string, lon: string) {
    return await fetchRequest('timezone', { lat, lon })
}
