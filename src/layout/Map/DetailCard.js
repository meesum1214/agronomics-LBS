import { Paper, SegmentedControl, Transition } from "@mantine/core"
import { useDidUpdate } from "@mantine/hooks"
import { useState } from "react"
// import LocationDetails from "./LocationDetails"
// import MarketInfo from "./MarketInfo"
// import Notifications from "./Notifications"
import { useResizeObserver } from '@mantine/hooks';
import CropInfo from "./CropInfo"


export default ({ selected }) => {
    const [ref, rect] = useResizeObserver();
    const [segment, setsegment] = useState('CropMonitoring')
    const [opened, setOpened] = useState(true);
    // const clickOutsideRef = useClickOutside(() => setOpened(false));

    useDidUpdate(() => {
        if (selected) {
            setOpened(true)
        } else {
            setOpened(false)
        }
    }, [selected])

    return (
        <>
            {
                selected && (
                    <Transition mounted={opened} transition={'slide-up'} duration={200} timingFunction="ease">
                        {(styles) => (

                            <Paper
                                ref={ref}
                                shadow="md"
                                style={{ ...styles }}
                                className="bg-white relaive z-50  h-[400px] w-full shadow-heavy p-2"
                            // ref={clickOutsideRef}
                            >
                                <div className="justify-center">
                                    <SegmentedControl
                                        fullWidth
                                        data={[
                                            // { value: 'LandDetails', label: 'Location Details' },
                                            { value: 'CropMonitoring', label: 'Crop Monitoring' },
                                            // { value: 'MarketDetails', label: 'Market Info' },
                                            // { value: 'Notifications', label: 'Notifications' },

                                        ]}
                                        onChange={(value) => setsegment(value)}
                                        value={segment}
                                        color="pink"
                                        radius={'xl'}
                                        size="xs"
                                    />
                                </div>
                                {
                                    segment === 'CropMonitoring' ? <CropInfo selected={selected} /> :
                                        //   segment === 'LandDetails' ? <LocationDetails selected={selected} /> :
                                        //     segment === 'MarketDetails' ? <MarketInfo selected={selected} /> :
                                        //       segment === 'Notifications' ? <Notifications selected={selected} /> :
                                        <></>
                                }

                            </Paper>

                        )}
                    </Transition>
                )
            }
        </>

    )
}