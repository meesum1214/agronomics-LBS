import { Divider, ScrollArea } from "@mantine/core"
import Image from "next/image"

export default ({ selectedLand }) => {

    const cropsSimulation = JSON.parse(selectedLand.cropwaters[0].simulation)

    return (
        <div className="w-full flex flex-col items-center p-2">
            <div className="font-tahoma font-semibold text-lg py-2">Simultion Forecast</div>
            <Divider size='lg' className='rounded-full' />
            <div className="w-full p-4">
                <div className="font-semibold">Wheat</div>
                <ScrollArea className="text-sm py-4">
                    <div className='flex w-80'>
                        {
                            cropsSimulation?.map((item, index) => (
                                <div className="flex" key={'rhgehe' + index}>
                                    <div className="flex flex-col justify-between items-center h-56 px-6">
                                        <div className="flex flex-col items-center">
                                            <div>{item['crop stage']}</div>
                                        </div>
                                        <div>
                                            <Image
                                                src={item['stage image']}
                                                alt="Simulated Crop"
                                                width={100}
                                                height={100}
                                                priority
                                                className="w-auto h-auto"
                                            />
                                        </div>
                                        <div>Day 1</div>
                                    </div>
                                    <Divider orientation="vertical" size='lg' className='rounded-full' />
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}