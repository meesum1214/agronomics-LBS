import { Divider } from "@mantine/core"
import Image from "next/legacy/image"

export default ({ image, crop, crop_urdu, onClick }) => {

    return (
        <div onClick={onClick} className='cursor-pointer hover:bg-gray-100 active:bg-gray-200'>
            <Divider />
            <div className="flex justify-between items-center py-2 px-4 text-tahoma font-medium">
                <div className="flex items-center">
                    <div>
                        <Image
                            src={image}
                            // alt="Simulated Crop"
                            width={50}
                            height={50}
                            className="rounded-full"
                            priority
                        />
                    </div>
                    <div className="ml-4">{crop}</div>
                </div>
                <div>{crop_urdu}</div>
            </div>
            <Divider />
        </div>
    )
}