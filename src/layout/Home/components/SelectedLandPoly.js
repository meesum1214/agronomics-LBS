import maplibreGl from 'maplibre-gl';
import { Source, Layer, useMap } from 'react-map-gl';
import { useDidUpdate } from '@mantine/hooks'

export default ({ selectedLand }) => {
    //   const selectedLand = useSelectedLand()?.selectedLand?.geometry || '[]';
    let land = selectedLand?.geometry || '[]';
    const map = useMap()?.current

    useDidUpdate(() => {

        if (land !== '[]') {
            const bounds = new maplibreGl.LngLatBounds();
            JSON.parse(land).forEach((point) => {
                bounds.extend(point);
            });
            map.fitBounds(bounds, { padding: 20 });
        }

    }, [land])

    return (
        <Source id="selectedLand" type="geojson"
            data={{
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [JSON.parse(land)]
                    }
                }]
            }}
        >

            <Layer
                id="selectedLandOutline"
                type="line"
                paint={{
                    'line-color': 'red',
                    'line-width': 2
                }}
            />
        </Source>
    )
}

