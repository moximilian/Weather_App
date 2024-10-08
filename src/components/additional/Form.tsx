import React, { useEffect, useState, useContext, useRef } from 'react'
import { MyGlobalContext } from '../../hooks/useGlobalContext'
import data from '../../files/phrases.json'
import GetWeather from '../../api.functions/GetWeather'
import GetCoords from '../../api.functions/GetCoords'

const Form: React.FC = () => {
    const cityRef = useRef<HTMLInputElement>(null)
    const { setWeather, setLoading, setFormData, setError, error } = useContext(MyGlobalContext)
    const [phrases, setPhrases] = useState([''])

    useEffect(() => {
        setPhrases(data.phrases)
    }, [])

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const cyrillicPattern = new RegExp('e/^p{Script=Cyrillic}+$/u')
        const city = cityRef.current !== null ? cityRef.current.value : ''

        if (!city) return
        const isRus: boolean = cyrillicPattern.test(city)
        if (isRus) {
            setError('Use only latin letters')
            setWeather(undefined)
        }

        if (error) return 
        setFormData({ city: city })
        setLoading(true)
        GetCoords(city).then(cityRes => {
            const results = cityRes[0]
            GetWeather(results.latitude, results.longitude).then(res => {
                setLoading(false)
                res
                    ? setWeather(res)
                    : setError('there is no city as ' + city)      
            })
        })
    }

    const placeRandomPhrase = (): string => {
        const randomIndex = Math.floor(Math.random() * phrases.length)
        return phrases[randomIndex]
    }
    return (
        <>
            <form onSubmit={submitForm} className="search_form">
                <input
                    id="city"
                    className="search"
                    ref={cityRef}
                    name="city"
                    type="text"
                    placeholder={placeRandomPhrase()}
                />
                <input type="submit" value="Show weather" className="sunny-button" />
            </form>
        </>
    )
}
export default Form
