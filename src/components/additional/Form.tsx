import React, { useEffect, useState, useContext, useRef } from 'react';
import { MyGlobalContext } from "../../functions/useGlobalContext"
import data from '../../files/phrases.json';
import GetWeather from '../../functions/GetWeather';


const Form: React.FC = () => {
    const cityRef = useRef<HTMLInputElement>(null);
    const { setWeather, setLoading, setFormData, setError, error } = useContext(MyGlobalContext);
    const [phrases, setPhrases] = useState(['']);

    useEffect(() => {
        setPhrases(data.phrases);
    }, []);


    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
        const city = cityRef.current !== null ? cityRef.current.value : '';

        if (city !== '') {
            const isRus: boolean = (cyrillicPattern.test(city));
            if (isRus) {
                setError('Use only latin letters');
                setWeather(undefined);
            }

            if (error === '') {
                setFormData({ 'city': city });
                setLoading(true);
                GetWeather({ 'city': city })
                    .then(res => {
                        setLoading(false);
                        if ('sunset' in res) {
                            setWeather(res)
                        } else {
                            setError('there is no city as ' + city);
                            setWeather(undefined);
                        }
                    });
            }
        }

    }



    const placeRandomPhrase = (): string => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }
    return <>
        <form onSubmit={submitForm} className='search_form'>
            <input id='city' className='search' ref={cityRef} name='city' type="text" placeholder={placeRandomPhrase()} />
            <input type="submit" value="Show weather" className='sunny-button' />
        </form>

    </>
}
export default Form;