import { useEffect, useState } from "react"
import { getLands } from "../layout/API/add"
import Btn from "../layout/globalComponents/Btn"
import Footer from "../layout/globalComponents/Footer"
import LandsModal from "../layout/globalComponents/LandsModal"
import Loader from "../layout/globalComponents/Loader"
import Navbar from "../layout/globalComponents/Navbar"
import MapDisplay from "../layout/Map/MapDisplay"


export default () => {

    const [loader, setLoader] = useState(false)

    const [opened, setOpened] = useState(false);

    const [lands, setLands] = useState([])
    const [selectedLand, setSelectedLand] = useState(null)

    useEffect(() => {
        getLands(16).then(res => {
            // console.log(res.data)
            setLands(res.data)
        })
    }, [])


    return (
        <>
            <Loader LoadingState={loader} />
            <Navbar />

            <div className="flex justify-start py-3 p-2 bg-gray-100">
                <Btn onClick={() => setOpened(true)}>Select Land</Btn>
                {/* <Btn onClick={() => { }}>Add Land</Btn> */}
            </div>

            <MapDisplay selectedLand={selectedLand} setLoader={setLoader} />

            <Footer />


            <LandsModal opened={opened} setOpened={setOpened} lands={lands} selectedLand={selectedLand} setSelectedLand={setSelectedLand} />
        </>
    )
}