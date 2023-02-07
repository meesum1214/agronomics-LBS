import { useRouter } from "next/router";
import { Divider, Stepper } from "@mantine/core"
import { useState } from "react";
import Btn from "../../globalComponents/Btn";
import { postCheckbox } from "../../API/add";

export default ({ list, cropRecordId }) => {

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

    const router = useRouter()

    return (
        <div className="p-2 w-full h-96">
            <div className="h-[370px] flex flex-col justify-between">
                {
                    list?.map(({ crop, variety_name, crop_land_preparation }, i) => {
                        return (
                            <div key={i} className="w-full">
                                <div className="w-full flex justify-around">
                                    <div className="font-semibold"> <span className="text-primary">CROP NAME: </span> <span>{crop} </span></div>
                                    <div className="font-semibold"> <span className="text-primary">SEED NAME: </span> <span>{variety_name} </span></div>
                                </div>

                                <div>
                                    <Divider className="my-4" />

                                    <Stepper active={active} onStepClick={setActive} color="primary">

                                        {
                                            crop_land_preparation?.map(({ checked, land_preparation, day, step, step_urdu }, i) => {
                                                return (
                                                    <Stepper.Step disabled key={i}>
                                                        {
                                                            // active + 1 < crop_land_preparation.length ?
                                                            checked === 'Checked' ?
                                                                setActive(active + 1) : (
                                                                    <div className="w-full flex flex-col justify-between">
                                                                        <div>
                                                                            <div className="text-primary font-bold flex justify-center">Day {day}:</div>
                                                                            <div className="text-sm w-2/3">{step}</div>
                                                                            <div className="text-sm text-right w-full flex justify-end">
                                                                                <div className="w-2/3">{step_urdu}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="w-full flex justify-center mt-4">
                                                                            <div className="w-44">
                                                                                {
                                                                                    active + 1 < crop_land_preparation.length ? (
                                                                                        <Btn onClick={() => {
                                                                                            // LoadingAG(true)
                                                                                            postCheckbox(cropRecordId, `${land_preparation}`)
                                                                                                .then((res) => {
                                                                                                    console.log('First Step Response: ', res)
                                                                                                    setTimeout(() => {
                                                                                                        nextStep()
                                                                                                        // LoadingAG(false)
                                                                                                    }, 1000)
                                                                                                })
                                                                                                .catch((err) => {
                                                                                                    console.log('Error: ', err)
                                                                                                })
                                                                                            console.log('cropRecordId', cropRecordId)
                                                                                            console.log('land_preparation', land_preparation)
                                                                                        }}>Next</Btn>
                                                                                    )
                                                                                        :
                                                                                        (
                                                                                            <Btn onClick={() => {
                                                                                                // LoadingAG(true)
                                                                                                postCheckbox(cropRecordId, `${land_preparation}`)
                                                                                                    .then((res) => {
                                                                                                        console.log('First Step Response: ', res)
                                                                                                        setTimeout(() => {
                                                                                                            nextStep()
                                                                                                            // LoadingAG(false)
                                                                                                        }, 1000)
                                                                                                    })
                                                                                                    .catch((err) => {
                                                                                                        console.log('Error: ', err)
                                                                                                    })
                                                                                            }}>Done</Btn>
                                                                                        )
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            // :
                                                            // router.reload()
                                                        }
                                                    </Stepper.Step>
                                                )
                                            })
                                        }


                                        <Stepper.Completed>
                                            <div className="h-[199px] flex justify-center items-center text-lg text-primary font-bold">
                                                Crop Water Added!
                                            </div>
                                        </Stepper.Completed>
                                    </Stepper>

                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}