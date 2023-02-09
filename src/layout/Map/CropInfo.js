import { Divider, Select } from "@mantine/core"
import { useEffect, useState } from "react"
import CropMonitoringChart from "./CropMonitoringChart"

export default ({ selected }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [selectedIndex, setSelectedIndex] = useState('NDVI')


  useEffect(() => {
    setLoading(true)
    fetch(`/api/getMonitoring?farmid=${selected.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log('>>>>> ', res)
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [selected])


  return (
    <div className="flex flex-col">
      <div className="flex">
        <h3 className="my-3 font-bold text-primary text-xl">{selected?.crop_records?.[0]?.crop}</h3>
        <div className="flex-1" />
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
      <Divider />
      {
        error && <div className="text-center text-red-500">{error}</div>
      }

      {
        loading ? <div className="text-center">Loading...</div>
          :
          <div className="h-64 w-full">

            <h3>Time Series Chart of {selectedIndex}</h3>
            <Divider />
            <CropMonitoringChart data={data} index={selectedIndex}/>
          </div>
      }
    </div>
  )
}

