import { createContext, useContext } from 'react'
import { IWeather, ICity, ICoords } from '../help/inertfaces'
export const MyGlobalContext = createContext<{
    weather: IWeather | undefined
    loading: boolean
    formData: ICity | undefined | ICoords
    showForm: boolean
    error: string
    setWeather: (value: IWeather | undefined) => void
    setLoading: (value: boolean) => void
    setFormData: (value: ICity | ICoords) => void
    setShowForm: (value: boolean) => void
    setError: (value: string) => void
}>({
    weather: undefined,
    loading: false,
    formData: undefined,
    showForm: true,
    error: '',
    setWeather: () => {},
    setLoading: () => {},
    setFormData: () => {},
    setShowForm: () => {},
    setError: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)
