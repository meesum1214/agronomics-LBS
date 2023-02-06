import axios from "axios"
import { useEffect, useState } from "react"
import CropData from "./CropData"
import CropSimulator from "./CropSimulator"
import CropWater from "./CropWater"

export default ({ selectedLand }) => {
    const [list, setList] = useState()

    useEffect(() => {
        axios.get(`https://agronomics.pk/legacy_api/get_crop_list_by_crop?crop_record_id=${selectedLand?.crop_records[0]?.id}`, {
            headers: {
                "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
            }
        }).then((res) => {
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