import { Divider } from "@mantine/core"

export default ({ land, selectedLand, setSelectedLand }) => {
    return (
        <div
            className={`w-full h-54 pt-1 px-2 rounded-lg text-sm font-tahoma cursor-pointer transition-all hover:bg-gray-100 ${selectedLand?.id === land.id ? 'bg-primary hover:bg-primaryDark text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedLand(land)}
        >
            <div className="py-2">
                <div className="flex justify-between">
                    <div className={`${land.crop_records.length > 0 ? 'bg-primary' : 'bg-secondary'} text-2xs tracking-wider text-white px-6 py-0.5 rounded-full font-bold cursor-pointer transition-transform flex justify-center border-white border-2 `}>
                        {land.crop_records.length > 0 ? 'Cultivated' : 'Non-Cultivated'}
                    </div>
                </div>
                <div className="py-1 font-semibold text-lg my-2">{land.name}</div>
                <div className="flex justify-between items-center">
                    <div>{land?.tehsil}</div>
                    <div className={`font-semibold`}>{land.size}</div>
                </div>
            </div>
            <Divider />
        </div>
    )
}