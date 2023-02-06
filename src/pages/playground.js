import { Stepper } from "@mantine/core"

export default () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-96 h-96 bg-white p-3">
                <Stepper allowNextStepsSelect={false} className="w-full border border-red-500">
                    <Stepper.Step>
                        Step 1 content: Create an account
                    </Stepper.Step>
                    <Stepper.Step>
                        Step 2 content: Verify email
                    </Stepper.Step>
                    <Stepper.Step>
                        Step 3 content: Get full access
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
            </div>
        </div>
    )
}