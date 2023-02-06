import maplibre from 'maplibre-gl'
import MapGl,{Source,Layer} from 'react-map-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import SelectedLandPoly from './SelectedLandPoly'

export default ({selectedLand}) => {
    const saturl = 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
    return (
        <div className='h-full w-full saturate-200 contrast-125 brightness-125'>
            <MapGl
                antialias
                mapLib={maplibre}
                style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                mapStyle="https://demotiles.maplibre.org/style.json"
                initialViewState={{
                    latitude: 33.75,
                    longitude: 72.85,
                    zoom: 12,
                }}
                
            >
                <Source type="raster" id="satellite" tiles={[saturl]} tileSize={256}>
                <Layer type="raster" id="satellite" source="satellite" />
                </Source>
                <SelectedLandPoly selectedLand={selectedLand} />

            </MapGl>
        </div>
    )
}