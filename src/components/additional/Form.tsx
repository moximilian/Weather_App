import React, { useEffect, useState, useContext, useRef } from 'react';
import { MyGlobalContext } from "../../functions/useGlobalContext"
import data from '../../files/phrases.json';
import GetWeather from '../../functions/GetWeather';


const Form: React.FC = () => {
    const cityRef = useRef<HTMLInputElement>(null);
    const { setWeather, setLoading, setFormData } = useContext(MyGlobalContext);
    const [phrases, setPhrases] = useState(['']);


    useEffect(() => {
        setPhrases(data.phrases);
    }, []);


    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const city = cityRef.current !== null ? cityRef.current.value : '';
        console.log(city);
        if (city !== '') {
            setFormData({ 'city': city });
            setLoading(true);
            GetWeather({ 'city': city })
                .then(res => {
                    console.log(res);
                    if (res.cloud_pct) {
                        setWeather(res)
                    } else {
                        setWeather({ ...res, error: 'There is no such city as ' + city })
                    }
                    setLoading(false);
                })
        }
    }



    const placeRandomPhrase = (): string => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }
    return <>
        <form onSubmit={submitForm} className='search_form'>
            <input className='search' ref={cityRef} name='city' type="text" placeholder={placeRandomPhrase()} />
            <input type="submit" value="Find me!" className='sunny-button' />
        </form>

    </>
}
export default Form;