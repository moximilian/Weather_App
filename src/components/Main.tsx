import Form from './additional/Form'
import Result from './additional/Result';
import { useState } from 'react';
import { MyGlobalContext } from '../functions/useGlobalContext';
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

export default function Main() {
    const [weather, setWeather] = useState<IWeather>();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICity>();
    return <>
        <div className='fadeInUp-animation'>
            <MyGlobalContext.Provider value={ {weather,loading, formData, setWeather,setLoading, setFormData} }>
                < Form />
                < Result />
            </MyGlobalContext.Provider>
        </div>
    </>;
}