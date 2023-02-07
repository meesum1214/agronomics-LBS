
import { useEffect, useState } from "react"
import { getCropWater } from "../../API/add"
import CropData from "./CropData"
import CropSimulator from "./CropSimulator"
import CropWater from "./CropWater"

export default ({ selectedLand }) => {
    const [list, setList] = useState()

    useEffect(() => {
        getCropWater(selectedLand?.crop_records[0]?.id).then((res) => {
            // console.log('Land Preparation List: ', res.data.list)
            setList(res.data.list)
            // console.log('Land Preparation List: ', landPreparation)
        }).catch((err) => {
            console.log('Error: ', err)
            // alert('Error: ', err)
        })
    }, [selectedLand])


    if (selectedLand?.crop_records.length > 0) {

        if (selectedLand?.cropwaters.length > 0) {
            return <CropSimulator selectedLand={selectedLand} />
        }
        else {
            return <CropWater list={list} cropRecordId={selectedLand?.crop_records[0]?.id} />
        }
    }
    else {
        return <CropData selectedLand={selectedLand} />
    }
}