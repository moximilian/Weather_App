import Form from '../components/additional/Form'
import Map from '../components/additional/Map'
import Result from '../components/additional/Result'
import { useState } from 'react'
import { MyGlobalContext } from '../hooks/useGlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IWeather, ICity, ICoords, MapProps } from '../help/inertfaces'

export default function MainPage() {
    const [weather, setWeather] = useState<IWeather>()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ICity | ICoords>()
    const [showForm, setShowForm] = useState(true)
    const [error, setError] = useState('')
    const props: MapProps[] = [{ show: 'yes' }, { show: 'no' }]
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

                <div className="fadeInUp-animation flex-columnNogap">
                    <Form />
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
