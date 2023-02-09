import { Divider } from "@mantine/core"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteLand } from "../../API/add";

export default ({ land, selectedLand, setSelectedLand, setOpened }) => {

    const router = useRouter()
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        let user = localStorage.getItem('lbs-user-app-web')
        setUserId(JSON.parse(user).id)
    }, [])
    

    return (
        <div
            className={`w-full h-54 pt-1 px-2 rounded-lg text-sm font-tahoma cursor-pointer transition-all hover:bg-gray-100 ${selectedLand?.id === land.id ? 'bg-primary hover:bg-primaryDark text-white' : 'hover:bg-gray-100'}`}
            onClick={() => { setSelectedLand(land); setOpened(false) }}
        >
            <div className="py-2">
                <div className="flex justify-between">
                    <div className={`${land.crop_records.length > 0 ? 'bg-primary' : 'bg-secondary'} text-xs tracking-wider text-white px-4 py-0.5 rounded-full font-bold cursor-pointer transition-transform flex justify-center border-white border-2 `}>
                        {land.crop_records.length > 0 ? 'Cultivated' : 'Non-Cultivated'}
                    </div>

                    <div className={`'bg-secondary text-xs tracking-wider text-white px-6 py-0.5 rounded-full font-bold cursor-pointer transition-transform flex justify-center border-white border-2 bg-secondary`}
                        onClick={() => {
                            deleteLand(land.id, userId)
                                .then(res => alert(res.data))
                                .catch(err => alert(err.message))
                            router.reload()
                        }}
                    >
                        Delete
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