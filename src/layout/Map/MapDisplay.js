import MapGl, { Layer, NavigationControl, Source } from 'react-map-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibreGl from 'maplibre-gl'
import GeocoderControl from './geocoder.control'
import SelectedLandPoly from '../Home/components/SelectedLandPoly'
import DrawButtons from './DrawButtons'
import { Select, TextInput } from '@mantine/core'
import { useState } from 'react'
import Indices from './Indices'

export default ({ selectedLand, setLoader }) => {
    const saturl = 'https://3-aerial-maps.eos.com/{z}/{x}/{y}/256/jpg?apiKey=vFdpBKVUQzxEEpXgepekV0isePWTcOI8vYFp86GL73o'

    const [geocoderresults, setgeocoderresults] = useState([])

    return (
        <div className="sm:h-[80vh] h-[60vh]">
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


                {/* <Select
                    placeholder="Search"
                    data={[
                        { value: 'react', label: 'React' },
                        { value: 'ng', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'vue', label: 'Vue' },
                    ]}
                    className="w-36 mt-2 ml-1"
                /> */}

                {/* <TextInput
                    placeholder="Search"
                    className="w-36 mt-2 ml-1"
                    onChange={(txt) => {
                        if (txt.length > 0) {
                            const geocodingClient = mbxGeocoding({
                                accessToken: 'pk.eyJ1IjoidW1lcmJpbGFsIiwiYSI6ImNrdWdnc3VqeDIzdm0ybm1vdWpyMWpjOGMifQ.HOeTyMNM9ZFJ2Ai5OJi7FQ',
                            });
                            // geocoding with countries
                            return geocodingClient
                                .forwardGeocode({
                                    query: txt,
                                    countries: ['pk'],
                                    limit: 4,
                                })
                                .send()
                                .then((response) => {
                                    setgeocoderresults(response.body.features)
                                    console.log(response.body.features)
                                });
                        } else {
                            setgeocoderresults([])
                        }
                    }}
                /> */}

                <Indices selected={selectedLand} />
                <SelectedLandPoly selectedLand={selectedLand} />
                <GeocoderControl position='top-right' mapboxAccessToken='pk.eyJ1IjoidW1lcmJpbGFsIiwiYSI6ImNrdWdnc3VqeDIzdm0ybm1vdWpyMWpjOGMifQ.HOeTyMNM9ZFJ2Ai5OJi7FQ' />
                <NavigationControl />
            </MapGl>
        </div>
    )
}