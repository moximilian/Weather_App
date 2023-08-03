import { createContext, useContext } from "react"
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
interface ICity{
    city:string;
}
export const MyGlobalContext = createContext<{
    weather: IWeather | undefined;
    loading:boolean;
    formData:ICity|undefined;
    setWeather: (value: IWeather) => void;
    setLoading: (value: boolean) => void;
    setFormData: (value:ICity ) => void;
}>({ weather: undefined, loading:false,formData:undefined, setWeather: () => { },setLoading: () => { },setFormData: () => { } });
export const useGlobalContext = () => useContext(MyGlobalContext)