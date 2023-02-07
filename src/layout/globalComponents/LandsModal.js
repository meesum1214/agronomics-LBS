import { Modal } from "@mantine/core"
import LandCard from "../Home/components/LandCard"

export default ({ opened, setOpened, lands, selectedLand, setSelectedLand }) => {
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="All Lands"
        >
            {
                lands.map((land, i) => (
                    <LandCard key={i} land={land} selectedLand={selectedLand} setSelectedLand={setSelectedLand} setOpened={setOpened} />
                ))
            }
        </Modal>
    )
}