import { YMaps, Map as YAMap } from '@pbe/react-yandex-maps'
import { MyGlobalContext } from '../../functions/useGlobalContext';
import { useContext, useEffect, useState, useRef, useMemo } from 'react'
import GetCoords from '../../functions/GetCoords';

interface ICoords {
    name: string,
    latitude: number,
    longitude: number,
    country: string,
    population: number,
    is_capital: boolean,
}

interface MapProps {
    show: string;
}
interface ICoordsShort {
    lon: number;
    lat: number
}

export default function Map({ show: props }: MapProps) {
    const { formData, error, weather } = useContext(MyGlobalContext);

    const [Coords, setCoords] = useState<ICoordsShort>({ lat: 0, lon: 0 });
    // const [isUpdatedCoords, SetUpdatedCoords] = useState(false);

    const CurCoords = useRef<ICoordsShort>()


    // var lat: number = 55.45;
    // var lon: number = 37.36;




    console.log('error in maps', error.length, 'daklcn');
    useMemo(() => {
        if (error === '') {
            if (formData && 'lat' in formData && props === 'no') {
                CurCoords.current = { 'lat': formData.lat, 'lon': formData.lon };
            }
            else if (props && formData && 'city' in formData) {
                GetCoords(formData.city)
                    .then(res => {
                        if (res[0] !== undefined && res[0].latitude) {
                            CurCoords.current = { 'lat': res[0].latitude, 'lon': res[0].longitude };
                        }

                    });

            }
        }

    }, [formData, props, error]);

    if (weather === undefined && formData && !('lat' in formData)) {
        CurCoords.current = undefined;
    }

    return <>

        {CurCoords.current && error === '' ?
            <>
                <YMaps>
                    <div className='center_map'>
                        <YAMap state={{ center: [CurCoords.current.lat, CurCoords.current.lon], zoom: 12 }} width='100%' height='100%' />
                    </div>

                </YMaps></> :
            <>
                <YMaps>
                    <div className='center_map'>
                        <YAMap state={{ center: [Coords?.lat, Coords?.lon], zoom: 2, }} width='100%' height='100%' />
                    </div>
                </YMaps>
            </>
        }
    </>

}


