import fetchRequest from './api.help'
export default async function GetCoords(city: string) {
    return await fetchRequest('city', { 'name': city })
}
