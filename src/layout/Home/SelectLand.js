import { Modal, ScrollArea } from "@mantine/core"
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
        <div className="flex justify-center">
            <div className="sm:p-2 max-w-[1100px] w-full flex justify-between sm:mt-3">
                <div className="sm:block hidden w-[24%]">
                    <div className="mb-2 bg-white rounded-md shadow-3xl p-3 font-bold text-lg text-primary">Your Lands</div>
                    <div className="bg-white rounded-md shadow-3xl h-[555px]">
                        <ScrollArea className="h-[550px]">
                            {
                                lands.map((land, i) => (
                                    <LandCard key={i} land={land} selectedLand={selectedLand} setSelectedLand={setSelectedLand} setOpened={setOpened} />
                                ))
                            }
                        </ScrollArea>
                    </div>
                </div>
                <div className="sm:p-0 p-2 sm:w-[75%] w-full">
                    <div className="sm:my-0 my-6 border-b border-gray-400 pb-1 flex justify-between items-center">
                        <div className="text-gray-600 text-xl font-semibold">{!selectedLand ? "Select Land" : selectedLand.name}</div>
                        <div className="sm:hidden"><Btn onClick={() => setOpened(true)}>Lands List</Btn></div>
                        <div className="sm:block hidden"><Btn onClick={() => router.push('/map')}>Add Land</Btn></div>
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

                    <div className="flex justify-end my-3 sm:hidden">
                        <Btn onClick={() => router.push('/map')}>Add Land</Btn>
                    </div>

                    <LandsModal opened={opened} setOpened={setOpened} lands={lands} selectedLand={selectedLand} setSelectedLand={setSelectedLand} />

                </div>
            </div>
        </div>
    )
}