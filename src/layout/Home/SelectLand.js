import { Modal } from "@mantine/core"
import { useEffect, useState } from "react";
import Btn from "../globalComponents/Btn"
import LandCard from "./components/LandCard";
import Map from "./components/Map";
import SelectedLand from "./components/SelectedLand";

export default ({ lands, selectedLand, setSelectedLand }) => {

    const [opened, setOpened] = useState(false);
    useEffect(() => {
        console.log('Selected Land: ', selectedLand)
        // console.log('suitablecrops: ', JSON.parse(selectedLand?.suitablecrops))
    }, [selectedLand])


    return (
        <div className="p-2">
            <div className="my-6 border-b border-gray-400 pb-1 flex justify-between items-center">
                <div className="text-gray-600 text-xl font-semibold">{!selectedLand ? "Select Land" : selectedLand.name}</div>
                <Btn onClick={() => setOpened(true)}>Lands List</Btn>
            </div>

            <div className={`w-full h-96 bg-white rounded-md shadow-3xl flex flex-col justify-center items-center mt-3`}>
                {selectedLand ? <SelectedLand selectedLand={selectedLand} />: 'No Land Selected'}
            </div>

            {/* <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                Weather!
            </div> */}

            <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                <Map selectedLand={selectedLand} />
            </div>



            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="All Lands"
            >
                {
                    lands.map((land, i) => (
                        <LandCard key={i} land={land} selectedLand={selectedLand} setSelectedLand={setSelectedLand} />
                    ))
                }
            </Modal>
        </div>
    )
}