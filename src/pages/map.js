import { ScrollArea } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getLands } from "../layout/API/add"
import Btn from "../layout/globalComponents/Btn"
import Footer from "../layout/globalComponents/Footer"
import LandsModal from "../layout/globalComponents/LandsModal"
import Loader from "../layout/globalComponents/Loader"
import Navbar from "../layout/globalComponents/Navbar"
import LandCard from "../layout/Home/components/LandCard"
import DetailCard from "../layout/Map/DetailCard"
import MapDisplay from "../layout/Map/MapDisplay"


export default () => {

    const [loader, setLoader] = useState(true)
    const [opened, setOpened] = useState(false);
    const [lands, setLands] = useState([])
    const [selectedLand, setSelectedLand] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('lbs-token-7878p') === null) {
            router.push('/login')
        } else {
            let user = localStorage.getItem('lbs-user-app-web')
            getLands(JSON.parse(user).id).then(res => {
                setLands(res.data)
                setLoader(false)
            }).catch(err => {
                console.log(err)
                setLoader(false)
            })
        }
    }, [])


    return (
        <>
            <Loader LoadingState={loader} />
            <Navbar />

            <div className="flex justify-start py-3 p-2 bg-gray-100 sm:hidden">
                <Btn onClick={() => setOpened(true)}>Select Land</Btn>
            </div>

            <div className="sm:flex">
                <div className="bg-white p-2 w-80 h-[80vh] sm:block hidden">
                    <ScrollArea className="h-[79vh]">
                        {
                            lands.map((land, i) => (
                                <LandCard key={i} land={land} selectedLand={selectedLand} setSelectedLand={setSelectedLand} setOpened={setOpened} />
                            ))
                        }
                    </ScrollArea>
                </div>
                <MapDisplay selectedLand={selectedLand} setLoader={setLoader} />
            </div>

            <DetailCard selected={selectedLand} />

            <Footer />


            <LandsModal opened={opened} setOpened={setOpened} lands={lands} selectedLand={selectedLand} setSelectedLand={setSelectedLand} />
        </>
    )
}