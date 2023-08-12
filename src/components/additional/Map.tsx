import { YMaps, Map as YAMap } from '@pbe/react-yandex-maps'
import { MyGlobalContext } from '../../functions/useGlobalContext';
import { useContext, useState, useRef, useMemo } from 'react'
import GetCoords from '../../functions/GetCoords';



interface MapProps {
    show: string;
}
interface ICoordsShort {
    lon: number;
    lat: number
}

export default function Map({ show: props }: MapProps) {
    const { formData, error, weather, loading } = useContext(MyGlobalContext);

    const [Coords, setCoords] = useState<ICoordsShort>({ lat: 0, lon: 0 });
    // const [isUpdatedCoords, SetUpdatedCoords] = useState(false);
    const CurCoords = useRef<ICoordsShort>()






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
    const getMapWidth = (): string => {

        if (loading || weather === undefined) {
            if (CurCoords.current) {
                CurCoords.current.lon -= 0.065;
            }
            return 'center_map_big';
        }
        if (loading || weather !== undefined) {
            if (CurCoords.current) {
                CurCoords.current.lon += 0.065;
            }
            return 'center_map_small';
        } else return '';

    }

    return <>

        {CurCoords.current && error === '' ?
            <>
                <YMaps>
                    <div className={getMapWidth()}>
                        <YAMap state={{ center: [CurCoords.current.lat, CurCoords.current.lon], zoom: 12 }} width='100%' height='100%' />
                    </div>

                </YMaps></> :
            <>
                <YMaps>
                    <div className={getMapWidth()}>
                        <YAMap state={{ center: [Coords?.lat, Coords?.lon], zoom: 2, }} width='100%' height='100%' />
                    </div>
                </YMaps>
            </>
        }
    </>

}


