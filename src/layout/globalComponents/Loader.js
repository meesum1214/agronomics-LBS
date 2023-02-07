import Lottie from "react-lottie"
import * as animationData from "./lottie/animated-logo.json"

export default ({ LoadingState }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={`z-50 fixed w-screen h-screen flex justify-center items-center bg-bgblacktp ${LoadingState ? 'block' : 'hidden'}`}>
            <Lottie options={defaultOptions}
                height={150}
                width={150}
            />
        </div>
    )
}