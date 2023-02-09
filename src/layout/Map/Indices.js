import { LoadingOverlay, Select } from "@mantine/core"
import { useEffect, useState } from "react"
import { Source, Layer } from "react-map-gl"

export default ({selected}) => {

    const [url, setUrl] = useState([])
    const [selectedIndex, setSelectedIndex] = useState('NDVI')

    useEffect(() => {
        if (selected) {
            setUrl([])
            fetch(`/api/getRealtimeMonitoring?index=${selectedIndex}&geometry=${selected.geometry}`)
                .then(res => res.text())
                .then(res => {
                    const url = [res.replace('"\\"', "").replace('\\""', "")]
                    setUrl(url)
                })
        }
    }, [selected, selectedIndex])

    return (
        <>
            {selected &&
                <>
                    <div className="w-32 absolute z-50 m-2 bottom-0">

                        <div className="flex flex-row bg-white p-2">
                            <div className="h-3 bg-gradient-to-r from-[red] to-[yellow]  flex-1 z-10" />
                            <div className="h-3 bg-gradient-to-r from-[yellow] to-[green]  flex-1 z-10" />
                        </div>
                        <div>
                            <div className="flex p-1 bg-white flex-row">
                                <p className="text-xs">-1</p>
                                <p className="text-xs flex-1 text-center">0</p>
                                <p className="text-xs text-right">1</p>
                            </div>
                        </div>

                        <LoadingOverlay visible={url.length === 0} />
                        <Select
                            data={[

                                { label: 'NDVI', value: 'NDVI' },

                                { label: 'EVI', value: 'EVI' },
                                { label: 'SAVI', value: 'SAVI' },
                                { label: 'MSAVI', value: 'MSAVI' },
                                { label: 'OSAVI', value: 'OSAVI' },
                                { label: 'GNDVI', value: 'GNDVI' },
                                { label: 'GCI', value: 'GCI' },
                                { label: 'NBR', value: 'NBR' },
                                { label: 'NDRE', value: 'NDRE' },
                                { label: 'ARVI', value: 'ARVI' },
                                { label: 'RECL', value: 'RECL' },
                                { label: 'VARI', value: 'VARI' },
                                { label: 'SIPI', value: 'SIPI' },

                            ]}
                            value={selectedIndex}
                            onChange={setSelectedIndex}
                        />

                    </div>




                </>
            }
            {url.length > 0 &&
                <Source type="raster" id="monitori" tiles={url} tileSize={256}>
                    <Layer type="raster" id="monitorikayer" source="monitori" />
                </Source>
            }
        </>
    )
}