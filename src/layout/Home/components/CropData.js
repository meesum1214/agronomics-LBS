import { Divider, ScrollArea, Stepper } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import FifthStep from "./FifthStep";
import FourthStep from "./FourthStep";
import SeedVarities from "./SeedVarities";
import SuitableCrops from "./SuitableCrops";
import parse from 'html-react-parser';

export default ({ selectedLand }) => {

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    // const selectedLand = useSelectedLand()?.selectedLand
    const [cropsData, setCropsData] = useState({
        crop: '',
        crop_urdu: '',
        varieties_eng: '',
        varieties_urdu: '',
    })

    const [seedVarities, setSeedVarities] = useState([])
    const [selectedSeedVariety, setSelectedSeedVariety] = useState('')
    const [selectedSowingMethod, setSelectedSowingMethod] = useState('')

    useDidUpdate(() => {
        setCropsData({
            crop: '',
            crop_urdu: '',
            varieties_eng: '',
            varieties_urdu: '',
        })
        setSeedVarities([])
        setActive(0)
    }, [selectedLand])

    const [sowingMethods, setSowingMethods] = useState([])

    const [location, setLocation] = useState({
        lat: '',
        lng: ''
    })

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((e) => {
            setLocation({
                lat: e.coords.latitude,
                lng: e.coords.longitude
            })
        })
    }, [])


    const [managementPractices, setManagementPractices] = useState({})


    return (
        <div className="p-2 w-full">
            <Stepper active={active} onStepClick={setActive} size='xs' className="w-full">
                <Stepper.Step disabled>
                    <ScrollArea style={{ width: '100%', height: 300 }} offsetScrollbars>
                        {
                            Mapper()
                        }
                    </ScrollArea>
                </Stepper.Step>
                <Stepper.Step disabled>
                    <ScrollArea style={{ width: '100%', height: 300 }} offsetScrollbars>
                        <Divider />
                        {
                            seedVarities?.map(({ varieties_eng, varieties_urdu, varities_type }, i) => (
                                <SeedVarities key={i} onClick={() => {
                                    setSelectedSeedVariety(varieties_eng)
                                    axios.get(`https://agronomics.pk/legacy_api/sowing_method?crop=${cropsData.crop}`, {
                                        headers: {
                                            "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
                                        }
                                    }).then(res => {
                                        // console.log('Sowing Methods: >>', res.data.list['Sowing_Methods:'])
                                        setSowingMethods(res.data.list['Sowing_Methods:'])
                                        setCropsData({ ...cropsData, varieties_eng, varieties_urdu });
                                        nextStep()
                                    })
                                }} varieties_eng={varieties_eng} varieties_urdu={varieties_urdu} varities_type={varities_type} />
                            ))
                        }
                    </ScrollArea>
                </Stepper.Step>
                <Stepper.Step disabled>
                    <ScrollArea style={{ width: '100%', height: 300 }} offsetScrollbars>
                        <Divider />
                        {
                            sowingMethods?.map(({ crop, method, method_urdu }, i) => {
                                // console.log('Method: >>>>>>>>>>>>>>  ', method)
                                let eMethod = parse(method)
                                let uMethod = parse(method_urdu)
                                return (
                                    <SeedVarities
                                        key={i}
                                        varieties_eng={eMethod}
                                        varieties_urdu={uMethod}
                                        varities_type={crop}
                                        onClick={() => {
                                            setSelectedSowingMethod(method)
                                            nextStep()
                                        }}
                                    />
                                )
                            })
                        }
                    </ScrollArea>
                </Stepper.Step>
                <Stepper.Step disabled>
                    <FourthStep
                        crop={cropsData.crop}
                        crop_urdu={cropsData.crop_urdu}
                        varieties_eng={cropsData.varieties_eng}
                        varieties_urdu={cropsData.varieties_urdu}
                        onClick={() => {
                            axios.get(`https://agronomics.pk/legacy_api/soil_suitability?lat=${location.lat}&lng=${location.lng}&miles=5000&cropname=${cropsData.crop}`, {
                                headers: {
                                    "Greenage": "5e306c70c4cc37211fae9044c927e1af3ebb3404",
                                }
                            }).then((res) => {
                                // console.log(res.data)
                                setManagementPractices(res.data)
                                nextStep()
                            })
                        }}
                    />
                </Stepper.Step>
                <Stepper.Step disabled>
                    <FifthStep
                        selectedLand={selectedLand}
                        managementPractices={managementPractices}
                        location={location}
                        cropsData={cropsData}
                        selectedSeedVariety={selectedSeedVariety}
                        selectedSowingMethod={selectedSowingMethod}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>
        </div>
    )

    function Mapper() {
        try {
            return JSON.parse(selectedLand?.suitablecrops).map(({ image, crop, crop_urdu, crop_varities }, i) => (
                <SuitableCrops key={i} image={image} crop={crop} crop_urdu={crop_urdu} onClick={() => {
                    setCropsData({ ...cropsData, crop, crop_urdu });
                    setSeedVarities(crop_varities);
                    nextStep();
                }} />
            ));
        } catch (e) {
            return <div className="text-center">No Data Found</div>
        }
    }
}