import { postCropRecord } from "@/layout/API/add"
import Btn from "@/layout/globalComponents/Btn"
import { Divider, ScrollArea } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
// import { postCropRecord } from "../../../../../../../../API/add"

export default ({ selectedLand, managementPractices, location, cropsData, selectedSeedVariety, selectedSowingMethod }) => {

  const [managementPracticess, setManagementPracticess] = useState([])

  const [date, setDate] = useState();



  //   const selectedLand = useSelectedLand()

  const suitableCrops = JSON.parse(selectedLand?.suitablecrops).filter((e) => e.crop === cropsData.crop)

  const [userId, setUserId] = useState(16)
  //   useEffect(() => {
  //     let userId = JSON.parse(localStorage.getItem("ag-user-app-web"))
  //     setUserId(userId)
  //   }, [])


  // const userId = JSON.parse(window.localStorage.getItem("ag-user-app-web"))

  const router = useRouter()

  useEffect(() => {
    // console.log("User ID:", userId.id)
    // console.log('cropsData: ', cropsData.crop)
    // console.log('Season: ', suitableCrops[0].season)
    // console.log('location: ', location)
    // console.log('Sowing Date: ', date)
    // console.log('Selected Land Id: ', selectedLand?.selectedLand?.id)
    // console.log('selectedSeedVariety: ', selectedSeedVariety)
    // console.log('selectedSowingMethod: ', selectedSowingMethod)
    // console.log('End Range: ', suitableCrops[0].e_range)
    // console.log('Start Range: ', suitableCrops[0].s_range)

    // console.log('Suitable Crops: ', suitableCrops)


    axios.get(`https://agronomics.pk/legacy_api/soil_suitability?lat=${location.lat}&lng=${location.lng}&miles=5000&cropname=${cropsData.crop}`, {
      headers: {
        "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
      }
    }).then((res) => {
      setManagementPracticess(res.data.list.management_practices)
      // console.log('management_practices: ', res.data.list.management_practices)
    }).catch((err) => {
      alert(err.message)
    })
  }, [])

  return (
    <ScrollArea className="h-[300px]">
      <div className="w-full">
        <div>
          {
            managementPractices?.list?.Land_Preparation?.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="text-primary font-semibold pb-2">Day: {item.day}</div>
                  <Divider />
                  <div className="text-gray-500 pt-2">{item.step}</div>
                  <div className="text-gray-500 text-right">{item.step_urdu}</div>
                </div>
              )
            })
          }
        </div>

        <div className="w-full flex justify-center my-4">
          <div className="w-[85%] rounded-md shadow-3xl font-tahoma flex flex-col justify-center p-2">
            <div className="font-semibold text-primary self-center">Note</div>
            <Divider className="my-2" />
            <div className="text-gray-500">For better results go for soil test, after harvesting of previous crop or atleast five days before land Land_Preparation.</div>
            <Divider className="my-2" />
            <div className="flex justify-center">
              <div className="font-semibold">FERTILITY STATUS: &nbsp;</div>
              <div className="text-red-600">{managementPractices.list.soil_fertility_level}</div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center my-4">
          <div className="w-[85%] rounded-md shadow-3xl font-tahoma flex justify-around">
            {
              managementPractices.list.fertilizer_recommendation.length > 0 ?
                managementPractices.list.fertilizer_recommendation.map(({ dapbags, sopbags, ureabags }, i) => (
                  <div key={i} className="border rounded-md p-3 my-2">
                    <div className="text-xs"> <span className="font-semibold"> Total DAP Bags: </span>{Math.round(dapbags)}</div>
                    <div className="text-xs"> <span className="font-semibold"> Total SOP Bags: </span>{Math.round(sopbags)}</div>
                    <div className="text-xs"> <span className="font-semibold"> Total Urea Bags:</span> {Math.round(ureabags)}</div>
                  </div>
                ))
                :
                <div></div>
            }
          </div>
        </div>

        <div className="w-full flex justify-center my-4">
          <div className="w-[85%] bg-white rounded-md shadow-3xl font-tahoma flex flex-col justify-center p-2">
            <ul style={{ listStyleType: 'square' }} className="ml-4">
              <li>
                <div className='flex justify-between'>
                  <div> FYM </div>
                  <div className='text-xs text-right'> {managementPracticess[0]?.farm_yard_manure} Ton/Acres </div>
                </div>
              </li>
              <li>
                <div className='flex justify-between'>
                  <div> GM </div>
                  <div className='text-xs w-60 text-right'> {managementPracticess[0]?.green_manuring_crops} </div>
                </div>
              </li>
              <li>
                <div className='flex justify-between'>
                  <div> Mulching </div>
                  <div className='text-xs w-52 text-right'> {managementPracticess[0]?.mulching} </div>
                </div>
              </li>
              <li>
                <div className='flex justify-between'>
                  <div> PM </div>
                  <div className='text-xs text-right'> {managementPracticess[0]?.poultry_manure} Ton/Acres </div>
                </div>
              </li>
            </ul>

            <DatePicker
              placeholder="Pick date"
              label="Event date"
              withAsterisk
              className='w-full'
              onChange={(e) => {
                setDate(e?.getDate() + '-' + (e?.getMonth()) + 1 + '-' + e?.getFullYear())
                // console.log('date: ', e?.getDate()+'-'+ (e?.getMonth())+1 +'-'+e?.getFullYear())
              }}
            />

            <div className='w-44 mt-2 self-center'>
              <Btn
                color='bg-secondary'
                textColor="white"
                onClick={() => {
                  if (userId && cropsData.crop && suitableCrops[0].season && location.lat && location.lng && date && selectedLand?.id && selectedSeedVariety && suitableCrops[0].s_range && suitableCrops[0].e_range && selectedSowingMethod) {
                    postCropRecord(userId, cropsData.crop, suitableCrops[0].season, location.lat, location.lng, date, selectedLand?.id, selectedSeedVariety, suitableCrops[0].s_range, suitableCrops[0].e_range, selectedSowingMethod).then((res) => {
                      console.log('res: ', res)
                      alert('Crop Record Added Successfully')
                      router.reload()
                    }).catch((err) => {
                      alert(err.message)
                    })
                  }
                  else {
                    alert('Please fill all fields')
                  }
                }}
              >Next</Btn>
            </div>
          </div>
        </div>

      </div>
    </ScrollArea>
  )
}