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
interface ICoords {
    lon: number;
    lat:number
}
export const MyGlobalContext = createContext<{
    weather: IWeather | undefined;
    loading:boolean;
    formData:ICity|undefined | ICoords;
    showForm:boolean;
    error:string,
    setWeather: (value: IWeather|undefined) => void;
    setLoading: (value: boolean) => void;
    setFormData: (value:ICity|ICoords ) => void;
    setShowForm:(value:boolean)=>void;
    setError:(value:string)=>void;
}>({ weather: undefined, 
    loading:false,
    formData:undefined,
    showForm:true,
    error:'', 
    setWeather: () => { },
    setLoading: () => { },
    setFormData: () => { },
    setShowForm: () => { }, 
    setError: () => { }, 
});
export const useGlobalContext = () => useContext(MyGlobalContext)