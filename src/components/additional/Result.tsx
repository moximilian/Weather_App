import { MyGlobalContext } from '../../hooks/useGlobalContext'
import { useContext, useEffect, useState } from 'react'
import CSS from 'csstype'
import GetTimezone from '../../api.functions/GetTimezone'
import GetCoords from '../../api.functions/GetCoords'
import { TimeRange } from '../../help/inertfaces'
export default function Result() {
    const [background, setBackground] = useState('')
    const [timezone, setTimezone] = useState('')

    function convertTZ(date: Date | string, tzString: string) {
        return new Date(
            (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
                timeZone: tzString,
            })
        )
    }
    const formatDate = (time: number) => {
        var date = new Date(time * 1000)
        if (timezone) {
            return convertTZ(date, timezone).toLocaleTimeString('en-US')
        } else {
            return date.toLocaleTimeString('en-US')
        }
    }
    const formatTime = (time: number) => {
        let date = new Date(time * 1000)
        if (timezone !== '') {
            date = convertTZ(date, timezone)
        }
        return date.getHours()
    }

    const { weather, loading, formData, error } = useContext(MyGlobalContext)
    const images = {
        sunset: '/sunset.jpg',
        night: '/night.jpg',
        sunny: '/sunny.jpg',
        rain: '/rain.jpg',
        storm: '/storm.jpg',
        clouds: '/clouds.jpg',
        sunrise: '/sunrise.jpg',
    } as const

    useEffect(() => {
        if (formData && 'city' in formData) {
            GetCoords(formData.city).then(res => {
                const result = res[0]
                GetTimezone(result.latitude, result.longitude).then(res => {
                    if (res) setTimezone(res.timezone)

                    const now = new Date()
                    let local: Date
                    local = res.timezone ? convertTZ(now, res.timezone) : new Date()
                    if (!weather) {
                        setBackground(images.sunny)
                        return
                    }
                    const timeRanges: TimeRange = {
                        night: [[23, 0, 1, 2, 3, 4, 5, 6]],
                        sunrise: [(hour: number) => hour >= formatTime(weather?.sunrise)],
                        sunset: [(hour: number) => hour >= formatTime(weather?.sunset)],
                        sunny: [
                            (hour: number) =>
                                hour > formatTime(weather?.sunrise) &&
                                hour < formatTime(weather?.sunset),
                        ],
                        rain: [(hour: number) => weather.humidity === 100],
                        storm: [
                            (hour: number) => weather.humidity >= 90 && weather.wind_speed >= 6,
                        ],
                    }

                    const currentHour = local.getHours()
                    const backgroundImage = Object.keys(timeRanges).find(key => {
                        const conditions = timeRanges[key]
                        return conditions.every(
                            (condition: number[] | ((hour: number) => boolean)) => {
                                return Array.isArray(condition)
                                    ? condition.every((hour: number) => currentHour >= hour)
                                    : condition(currentHour)
                            }
                        )
                    })
                    setBackground(images[(backgroundImage as keyof typeof images) ?? 'sunny'])
                })
            })
        }
    }, [
        weather,
        background,
        images.sunset,
        images.rain,
        images.sunny,
        images.storm,
        images.sunrise,
        images.night,
        formData,
        timezone,
    ])
    const GetTime = () => {
        let time = new Date()
        if (timezone) {
            time = convertTZ(time, timezone)
        }
        let minutes = time.getMinutes().toString()
        if (minutes.length < 2) {
            minutes = '0' + minutes
        }
        return time.getHours() + ':' + minutes
    }
    const backgroundEImage: CSS.Properties = {
        backgroundImage: `url(.${background})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'stretch',
        color: 'rgb(0, 0, 0)',
        borderRadius: '15px',
        height: '100%',
        width: '500px',
        paddingLeft: '15px',
        alignContent: 'flex-start',
        filter: ' brightness(100%) contrast(90%)',
        justifyContent: 'space-evenly',
    }
    if (weather !== undefined && loading === false && error === '') {
        return (
            <>
                <div className="fadeInUp-animation">
                    <div className="center_card">
                        <div style={backgroundEImage}>
                            <div>
                                <div className="small-box bigger">
                                    {formData && 'city' in formData ? formData?.city : ''}
                                </div>
                                <div className="small-box lesseen">Now {GetTime()}</div>
                            </div>

                            <div className="flex-row">
                                <div className="small-box capital">+{weather.temp}°С</div>
                                <div className="flex-column">
                                    <div className="small-box">
                                        {' '}
                                        <img className="svgComp" alt="" src="./cloud.svg" />{' '}
                                        {weather.cloud_pct}%
                                    </div>
                                    <div className="small-box lesseen">
                                        Feels Like +{weather.feels_like}°С
                                    </div>
                                </div>
                            </div>
                            <div className="flex-row">
                                <div className="small-box">
                                    {' '}
                                    <img className="svgComp" alt="" src="./wind.svg" />{' '}
                                    {weather.wind_speed} m\s
                                </div>
                                <div className="small-box">
                                    <img className="svgComp" alt="" src="./humidity.svg" />{' '}
                                    {weather.humidity}%
                                </div>
                                <div className="small-box">
                                    {weather.min_temp}°С{' '}
                                    <img className="svgComp" alt="" src="./arc.svg" />{' '}
                                    {weather.max_temp}°С
                                </div>
                            </div>
                            <div className="flex-row">
                                <div className="small-box">
                                    <img className="svgComp" alt="" src="./sunset.svg" />{' '}
                                    {formatDate(weather.sunrise)}{' '}
                                </div>
                                <div className="small-box">
                                    <img className="svgComp" alt="" src="./sunrise.svg" />{' '}
                                    {formatDate(weather.sunset)}{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (loading && error === '')
        return (
            <>
                <div className="moveLoaderCenter">
                    <label className="loader">
                        <span className="slider"></span>
                    </label>
                </div>
            </>
        )
    else if (error !== '') return <span className="Error">{error}</span>
    else return <></>
}
