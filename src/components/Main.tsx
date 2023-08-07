import Form from './additional/Form'
import Map from './additional/Map'
import Result from './additional/Result';
import { useState } from 'react';
import { MyGlobalContext } from '../functions/useGlobalContext';
import Header from './Header';
import Footer from './Footer';
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
    error: string,
}
interface ICity {
    city: string;
}
interface ICoords {
    lon: number;
    lat: number
}
interface MapProps {
    show: string;
}

export default function Main() {
    const [weather, setWeather] = useState<IWeather>();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICity | ICoords>();
    const [showForm, setShowForm] = useState(true);
    const [error, setError] = useState('');
    const props: MapProps[] = [
        { show: 'yes' },
        { show: 'no' },
    ];
    return <>
        <MyGlobalContext.Provider value={{ weather, 
                                        loading, 
                                        formData, 
                                        showForm, 
                                        error, 
                                        setWeather, 
                                        setLoading, 
                                        setFormData, 
                                        setShowForm, 
                                        setError }}>
            <Header />

            <div className='fadeInUp-animation'>
                {showForm ? <Form /> : ''}
                <div className='resulting_area'>
                {(formData && 'lat' in formData ? < Map show={props[1].show} /> : <Map show={props[0].show} />)}
                < Result />
                </div>
                
            </div >
        </MyGlobalContext.Provider>

        <Footer />
    </>;
}