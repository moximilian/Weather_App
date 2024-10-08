import { YMaps, Map as YAMap } from '@pbe/react-yandex-maps'
import { MyGlobalContext } from '../../hooks/useGlobalContext'
import { useContext, useState, useRef, useMemo } from 'react'
import GetCoords from '../../api.functions/GetCoords'
import { MapProps, ICoords } from '../../help/inertfaces'

export default function Map({ show: props }: MapProps) {
    const { formData, error, weather, loading } = useContext(MyGlobalContext)

    const [Coords, setCoords] = useState<ICoords>({ lat: 0, lon: 0 })
    const CurCoords = useRef<ICoords>()

    useMemo(() => {
        if (error) return
        if (formData && 'lat' in formData && props === 'no') {
            CurCoords.current = { lat: formData.lat, lon: formData.lon }
        } else if (props && formData && 'city' in formData) {
            GetCoords(formData.city).then(res => {
                const result = res?.[0]
                if (result) {
                    CurCoords.current = { lat: result.latitude, lon: result.longitude }
                }
            })
        }
    }, [formData, props, error])

    if (!weather && formData && !('lat' in formData)) {
        CurCoords.current = undefined
    }
    const getMapWidth = (): string => {
        if (!loading) return ''
        const longitudePadding = 0.065
        if (weather && CurCoords.current) {
            CurCoords.current.lon += longitudePadding
            return 'center_map_small'
        } else if (CurCoords.current) {
            CurCoords.current.lon -= longitudePadding
            return 'center_map_big'
        }
        return ''
    }

    return (
        <>
            {CurCoords.current && !error ? (
                <>
                    <YMaps>
                        <div className={getMapWidth()}>
                            <YAMap
                                state={{
                                    center: [CurCoords?.current.lat, CurCoords?.current.lon],
                                    zoom: 12,
                                }}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </YMaps>
                </>
            ) : (
                <>
                    <YMaps>
                        <div className={getMapWidth()}>
                            <YAMap
                                state={{ center: [Coords?.lat, Coords?.lon], zoom: 2 }}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </YMaps>
                </>
            )}
        </>
    )
}
