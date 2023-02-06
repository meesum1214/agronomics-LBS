import { Divider } from "@mantine/core"
import { MouseEventHandler } from "react"

export default ({varieties_eng, varieties_urdu, varities_type, onClick}) => {
    return (
        <div onClick={onClick}>
            <div className="flex w-full justify-between items-center p-2 font-tahoma text-sm hover:bg-gray-100 transition-all cursor-pointer">
                <div className="w-1/2">
                    <div>{varieties_eng}</div>
                    <div className="text-xs self-end">({varities_type})</div>
                </div>
                <div className="w-1/2">{varieties_urdu}</div>
            </div>
            <Divider />
        </div>
    )
}