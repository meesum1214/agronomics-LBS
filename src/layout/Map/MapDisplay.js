import MapGl, { Layer, NavigationControl, Source } from 'react-map-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibreGl from 'maplibre-gl'
import GeocoderControl from './geocoder.control'
import SelectedLandPoly from '../Home/components/SelectedLandPoly'
import DrawButtons from './DrawButtons'

export default ({selectedLand, setLoader}) => {
    const saturl = 'https://3-aerial-maps.eos.com/{z}/{x}/{y}/256/jpg?apiKey=vFdpBKVUQzxEEpXgepekV0isePWTcOI8vYFp86GL73o'
    return (
        <div className="h-[70vh]">
            <MapGl
                antialias
                mapLib={maplibreGl}
                style={{ width: '100%', height: '100%', position: 'relative' }}
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
                <DrawButtons setLoader={setLoader} />
                {/* <Indices /> */}
                {/* <AllLands /> */}

                <SelectedLandPoly selectedLand={selectedLand} />
                <GeocoderControl position='top-right' mapboxAccessToken='pk.eyJ1IjoidW1lcmJpbGFsIiwiYSI6ImNrdWdnc3VqeDIzdm0ybm1vdWpyMWpjOGMifQ.HOeTyMNM9ZFJ2Ai5OJi7FQ' />
                <NavigationControl />
            </MapGl>
        </div>
    )
}