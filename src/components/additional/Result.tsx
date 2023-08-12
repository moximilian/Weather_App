import { MyGlobalContext } from "../../functions/useGlobalContext";
import { useContext, useEffect, useState } from "react";
import CSS from 'csstype';
import GetTimezone from "../../functions/GetTimezone";
import GetCityByCoords from "../../functions/GetCityByCoords";

export default function Result() {
    const [background, setBackground] = useState('');
    const [timezone, setTimezone] = useState('');
    const [city_to_timezone, set_city_to_timezone] = useState('');

    function convertTZ(date: Date | string, tzString: string) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    const formatDate = (time: number) => {
        var date = new Date(time * 1000);
        if (timezone !== '') {
            return convertTZ(date, timezone).toLocaleTimeString("en-US");
        } else {
            return date.toLocaleTimeString("en-US");
        }
    }
    const formatTime = (time: number) => {
        var date = new Date(time * 1000);
        if (timezone !== '') {
            date = convertTZ(date, timezone);
        }
        return date.getHours();
    }

    const { weather, loading, formData, error } = useContext(MyGlobalContext);
    const images = {
        sunset: '/sunset.jpg',
        night: '/night.jpg',
        sunny: '/sunny.jpg',
        rain: '/rain.jpg',
        storm: '/storm.jpg',
        clouds: '/clouds.jpg',
        sunrise: '/sunrise.jpg',
    } as const;



    useEffect(() => {

        if (formData !== undefined && 'city' in formData) {
            set_city_to_timezone(formData.city);
        }
        else if (formData !== undefined && 'lat' in formData) {
            GetCityByCoords(formData)
                .then((res) => {
                    set_city_to_timezone(res[0].name);
                });
        }
        if (city_to_timezone !== '') {
            GetTimezone(city_to_timezone)
                .then((res) => {
                    if (res) {
                        setTimezone(res.timezone);
                    }
                });
        }


        const now = new Date();

        var local: Date;
        if (timezone !== '') {
            local = convertTZ(now, timezone);
        } else {
            local = new Date();
        }
        if (weather && local.getHours() >= formatTime(weather?.sunrise)) {
            setBackground(images.sunrise);
        }
        if (weather && local.getHours() >= formatTime(weather?.sunset)) {
            setBackground(images.sunset);
        }
        if (weather && (local.getHours() >= 23 || local.getHours() <= 6)) {
            setBackground(images.night);
        }
        if (weather && local.getHours() > formatTime(weather?.sunrise) && local.getHours() < formatTime(weather?.sunset)) {
            setBackground(images.sunny);
        }

        if (weather && weather.humidity === 100) {
            setBackground(images.rain);
        }
        if (weather && weather.humidity >= 90 && weather.wind_speed >= 6) {
            setBackground(images.storm);
        }
    }, [weather, background, images.sunset, images.rain, images.sunny, images.storm, images.sunrise, images.night, formData, timezone, city_to_timezone])
    const GetTime = () => {
        var time = new Date();
        if (timezone !== '') {
            time = convertTZ(time, timezone);
        }
        var minutes = time.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        return (time.getHours()-1) + ':' + minutes;
    }
    const backgroundEImage: CSS.Properties = {

        backgroundImage:`url(.${background})`,
        backgroundSize: 'cover',
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: "10px",
        alignItems: "stretch",
        color: "rgb(0, 0, 0)",
        borderRadius: "15px",
        height: "100%",
        width: "500px",
        paddingLeft: "15px",
        alignContent: "flex-start",
        filter: " brightness(100%) contrast(90%)",
        justifyContent: "space-evenly",
    };
    if (weather !== undefined && loading === false && error === '') {
        return <>
            <div className='fadeInUp-animation'>
                <div className="center_card">

                    <div style={backgroundEImage}>
                        <div>
                            <div className='small-box bigger'>{formData !== undefined && 'city' in formData ? formData.city : city_to_timezone}</div>
                            <div className='small-box lesseen'>Now {GetTime()}</div>
                        </div>

                        <div className="flex-row">
                            <div className='small-box capital'>+{weather.temp}°С</div>
                            <div className="flex-column">
                                <div className='small-box'> <img className="svgComp" alt='' src='./cloud.svg'/> {weather.cloud_pct}%</div>
                                <div className='small-box lesseen'>Feels Like +{weather.feels_like}°С</div>
                            </div>
                        </div>
                        <div className='flex-row'>
                            <div className='small-box'> <img className="svgComp" alt='' src='./wind.svg'/>  {weather.wind_speed} m\s</div>
                            <div className='small-box'><img className="svgComp" alt='' src='./humidity.svg'/> {weather.humidity}%</div>
                            <div className='small-box'>
                                {weather.min_temp}°С <img className="svgComp" alt='' src='./arc.svg'/> {weather.max_temp}°С
                            </div>
                        </div>
                        <div className='flex-row'>
                            <div className='small-box'><img className="svgComp" alt='' src='./sunset.svg'/> {formatDate(weather.sunrise)} </div>
                            <div className='small-box'><img className="svgComp" alt='' src='./sunrise.svg'/>  {formatDate(weather.sunset)} </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else if (loading && error === '')
        return <>

            <div className='moveLoaderCenter'>
                <label className="loader">
                    <span className="slider"></span>
                </label>
            </div>
        </>
    else if (error !== '')
        return <span className="Error">{error}</span>
    else
        return <>
        </>
}