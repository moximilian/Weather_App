import { MyGlobalContext } from "../../functions/useGlobalContext";
import { useContext } from "react";
import   Error   from './Error'
 

export default function Result() {
    const formatDate = (time: number) => {
        var date = new Date(time * 1000);
        return date.toLocaleTimeString("en-US");
    }
    const currentDate = () => {
        const now = new Date();
        return now.toLocaleDateString();
    }
    const { weather, loading, formData, error } = useContext(MyGlobalContext);
    if (weather !== undefined && loading === false  && formData !== undefined && error ==='') {
        return <>
            <div className='fadeInUp-animation'>
                <div className="center_card">
                    <div className='card'>
                        <div className='small-box'>
                            <div className='bold'> <img className='svgComp' alt='' src='./calendar.svg' />{currentDate()}{'city' in formData?formData.city:'Current region'}</div></div>
                        <div className='small-box'> <img className='svgComp' alt='' src='./cloud.svg' />Cloud percentage {weather.cloud_pct}%</div>
                        <div className='small-box'><img className='svgComp' alt='' src='./curtemp.svg' />Current Temperature +{weather.temp}</div>
                        <div className='small-box'><img className='svgComp' alt='' src='./feels.svg' />Feels Like +{weather.feels_like}°С</div>
                        <div className='small-box'><img className='svgComp' alt='' src='./humidity.svg' />Humidity level {weather.humidity}%</div>
                        <div className='small-box'>
                            <img className='svgComp' alt='' src='./changtemp.svg' />
                            {weather.min_temp}°С
                            — {weather.max_temp}°С
                        </div>
                        <div className='small-box'><img className='svgComp' alt='' src='./wind.svg' />Wind Speed {weather.wind_speed} m\s</div>
                        <div className='small-box'><img className='svgComp' alt='' src='./sunset.svg' />Sunrise {formatDate(weather.sunrise)} </div>
                        <div className='small-box'><img className='svgComp' alt='' src='./sunrise.svg' />Sunset {formatDate(weather.sunset)} </div>
                    </div>
                </div>
            </div>
        </>
    } else if (loading && error ==='')
        return <>
            <div className='fadeInUp-animation'>
                <div className='moveLoaderCenter'>
                    <div className="loader"></div>
                </div>
            </div>
        </>
    else if (error!=='')
        return <Error/>
    else
        return <>
        </>
}