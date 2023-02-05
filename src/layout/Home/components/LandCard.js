import { Divider } from "@mantine/core"

export default () => {
    return (
        <div
            className={`w-full h-54 pt-1 px-2 rounded-lg text-sm font-tahoma cursor-pointer transition-all hover:bg-gray-100`}
            // onClick={() => setSelectedLand(land)}
        >
            <div className="py-2">
                <div className="flex justify-between">
                    <div className={`text-2xs tracking-wider text-white px-6 py-0.5 rounded-full font-bold cursor-pointer transition-transform flex justify-center border-white border-2 bg-primary`}>
                       Cultivated
                    </div>
                </div>
                <div className="py-1 font-semibold text-lg">Salman Land</div>
                <div className="flex justify-between items-center">
                    <div className={``}>Rawalpindi</div>
                    <div className={`text-base font-semibold`}>25 Acre</div>
                </div>
            </div>
            <Divider />
        </div>
    )
}