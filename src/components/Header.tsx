import { Link } from 'react-router-dom'
import { useGeolocated } from 'react-geolocated'
import { MyGlobalContext } from '../functions/useGlobalContext';
import { useContext } from 'react'
import GetWeather from '../functions/GetWeather';

export default function Header() {
    const { setFormData, setWeather, setLoading, formData, setShowForm } = useContext(MyGlobalContext);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    const FindUserGeo = (coords: GeolocationCoordinates) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        setShowForm(false);
        setFormData({ 'lat': latitude, 'lon': longitude });
        if (formData !== undefined) {
            setLoading(true);
            GetWeather(formData)
                .then(res => {
                    
                    if (res.sunrise) {
                        setWeather(res)
                    }
                    setLoading(false);
                })
        }
    }

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <div className="navbar">
            <ul className="row">
                <div className='fadeInUp-animation'>
                    <span className="row-low">
                        <div className="geoposition"></div>
                        <li><button className='a' onClick={() => FindUserGeo(coords)}>Find me</button></li>
                    </span>
                </div>

                <li className='fadeInUp-animation'><a href='/' onClick={() => setShowForm(true)} >Other place</a></li>
                <li className='fadeInUp-animation'><Link to="/about">About us</Link></li>
            </ul>
        </div>
    ) : (
        <div>
            <div className='fadeInUp-animation'>
                <div className='moveLoaderCenter'>
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
};