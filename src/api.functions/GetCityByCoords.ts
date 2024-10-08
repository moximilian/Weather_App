import fetchRequest from './api.help'

export default async function GetCoords(data: { lat: number; lon: number }) {
    return await fetchRequest('reversegeocoding', data)
}
