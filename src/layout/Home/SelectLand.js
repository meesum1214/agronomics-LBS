import { Modal } from "@mantine/core"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Btn from "../globalComponents/Btn"
import LandsModal from "../globalComponents/LandsModal";
import LandCard from "./components/LandCard";
import Map from "./components/Map";
import SelectedLand from "./components/SelectedLand";

export default ({ lands, selectedLand, setSelectedLand }) => {

    const router = useRouter()
    const [opened, setOpened] = useState(false);
    // useEffect(() => {
        // console.log('Selected Land: ', selectedLand)
        // console.log('suitablecrops: ', JSON.parse(selectedLand?.suitablecrops))
    // }, [selectedLand])


    return (
        <div className="p-2">
            <div className="my-6 border-b border-gray-400 pb-1 flex justify-between items-center">
                <div className="text-gray-600 text-xl font-semibold">{!selectedLand ? "Select Land" : selectedLand.name}</div>
                <Btn onClick={() => setOpened(true)}>Lands List</Btn>
            </div>

            <div className={`w-full h-96 bg-white rounded-md shadow-3xl flex flex-col justify-center items-center mt-3`}>
                {selectedLand ? <SelectedLand selectedLand={selectedLand} /> : 'No Land Selected'}
            </div>

            {/* <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                Weather!
            </div> */}

            <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                <Map selectedLand={selectedLand} />
            </div>

            <div className="flex justify-end my-3">
                <Btn onClick={() => router.push('/map')}>Add Land</Btn>
            </div>

            <LandsModal opened={opened} setOpened={setOpened} lands={lands} selectedLand={selectedLand} setSelectedLand={setSelectedLand} />
            
        </div>
    )
}