import { IWeather, ICity, ICoords, MapProps } from '../help/inertfaces'
import Map from '../components/additional/Map'
import Result from '../components/additional/Result'
import { useRef, useState } from 'react'
import { MyGlobalContext } from '../hooks/useGlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GetWeather from '../api.functions/GetWeather'
import useRunOnce from '../hooks/useRunOnce'
export default function FindMePage() {
    const [weather, setWeather] = useState<IWeather>()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ICity | ICoords>()
    const [showForm, setShowForm] = useState(true)
    const [error, setError] = useState('')
    const props: MapProps[] = [{ show: 'yes' }, { show: 'no' }]

    const location = useRef<ICoords>()
    useRunOnce({
        fn: () => {
            if (!navigator.geolocation) return
            navigator.geolocation.getCurrentPosition(
                pos => {
                    location.current = { lat: pos.coords.latitude, lon: pos.coords.longitude }
                    setLoading(true)
                    setFormData(location.current)
                    GetWeather(
                        location.current.lat.toString(),
                        location.current.lon.toString()
                    ).then(res => {
                        if (res) {
                            setWeather(res)
                        }
                        setLoading(false)
                    })
                },
                error => {
                    setError('Error getting user location' + error)
                }
            )
        },
    })
    return (
        <>
            <MyGlobalContext.Provider
                value={{
                    weather,
                    loading,
                    formData,
                    showForm,
                    error,
                    setWeather,
                    setLoading,
                    setFormData,
                    setShowForm,
                    setError,
                }}
            >
                <Header />
                <div className="fadeInUp-animation">
                    <div className="resulting_area">
                        <Result />
                        {formData && 'lat' in formData ? (
                            <Map show={props[1].show} />
                        ) : (
                            <Map show={props[0].show} />
                        )}
                    </div>
                </div>
            </MyGlobalContext.Provider>
            <Footer />
        </>
    )
}
