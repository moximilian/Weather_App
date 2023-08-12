import Map from './additional/Map'
import Result from './additional/Result';
import { useRef, useState } from 'react';
import { MyGlobalContext } from '../functions/useGlobalContext';
import Header from './Header';
import Footer from './Footer';
import GetWeather from '../functions/GetWeather';
import useRunOnce from '../functions/useRunOnce';

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

export default function Here() {
    const [weather, setWeather] = useState<IWeather>();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICity | ICoords>();
    const [showForm, setShowForm] = useState(true);
    const [error, setError] = useState('');
    const props: MapProps[] = [
        { show: 'yes' },
        { show: 'no' },
    ];

    const location = useRef<ICoords>()
    useRunOnce({
        fn: () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        location.current = { 'lat': pos.coords.latitude, 'lon': pos.coords.longitude };
                        setLoading(true);
                        setFormData(location.current);
                        GetWeather(location.current)
                            .then(res => {
                                if (res.sunrise) {
                                    setWeather(res)
                                }
                                setLoading(false);
                            })
                    },
                    (error) => {
                        setError('Error getting user location' + error);
                    }
                );
            }
        }
    });




    return <>
        <MyGlobalContext.Provider value={{
            weather,
            loading,
            formData,
            showForm,
            error,
            setWeather,
            setLoading,
            setFormData,
            setShowForm,
            setError
        }}>
            <Header />

            <div className='fadeInUp-animation'>

                <div className='resulting_area'>
                    < Result />
                    {(formData && 'lat' in formData ? < Map show={props[1].show} /> : <Map show={props[0].show} />)}

                </div>

            </div >
        </MyGlobalContext.Provider>

        <Footer />
    </>;
}