import { Modal } from "@mantine/core"
import { useState } from "react";
import Btn from "../globalComponents/Btn"
import LandCard from "./components/LandCard";

export default () => {

    const [opened, setOpened] = useState(false);
    const [selected, setselected] = useState()

    return (
        <div className="p-2">
            <div className="my-6 border-b border-gray-400 pb-1 flex justify-between items-center">
                <div className="text-gray-600 text-xl font-semibold">Select Land</div>
                <Btn onClick={() => setOpened(true)}>Lands List</Btn>
            </div>

            <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                No Land Selected!
            </div>

            <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                Weather!
            </div>

            <div className="h-96 bg-white rounded-md shadow-3xl flex justify-center items-center mt-3">
                Map!
            </div>



            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="All Lands"
            >
                <LandCard />
                <LandCard />
                <LandCard />
                <LandCard />
            </Modal>
        </div>
    )
}