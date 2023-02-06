import Btn from "@/layout/globalComponents/Btn"
import { Divider } from "@mantine/core"

export default ({ crop, crop_urdu, varieties_eng, varieties_urdu, onClick}) => {

  return (
    <div className='w-full h-72 font-tahoma text-sm flex flex-col justify-between'>
      <div className="w-full">
        <div className='w-full flex justify-between'>
          <div className='text-primary'>Crop Name:</div>
          <div className='w-[90%] flex justify-between'>
            <div>{crop}</div>
            <div>{crop_urdu}</div>
          </div>
        </div>
        <div className='w-full flex justify-between mb-2'>
          <div className='text-primary'>Seed Name:</div>
          <div className='w-[90%] flex justify-between'>
            <div>{varieties_eng}</div>
            <div>{varieties_urdu}</div>
          </div>
        </div>
        <Divider />
        <div className='w-full mt-6 px-2 flex flex-col items-center'>
          <div className='text-primary font-semibold'>Suitable Sowing Time</div>
          <Divider />
          <div className='text-primary'>09-20-2022 -------- 10-31-2022</div>
        </div>
      </div>

      <div className="w-44 self-center">
        <Btn onClick={onClick}>Management Practices</Btn>
      </div>
    </div>
  )
}