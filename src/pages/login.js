import Btn from "../layout/globalComponents/Btn"
import { MdSend, MdVerified } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BackgroundImage } from "@mantine/core";
import Image from "next/image";
import { FaLinkedin, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { useState } from "react";
import { useRouter } from "next/router";
import { RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";
import { authentication } from "../layout/globalComponents/firebase-config";
import Loader from "../layout/globalComponents/Loader";
import { CheckPhone } from "../layout/API/add";

export default () => {
    const [phoneNumber, setPhoneNumber] = useState('+92')
    const [OTP, setOTP] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [state, setState] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            "size": "invisible",
            "callback": (response) => {
                console.log("response of captcha", response)
            }
        }, authentication);
    }

    const sendOtp = () => {
        setLoading(true)
        if (phoneNumber.length === 13) {
            // console.log(phoneNumber)
            generateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(authentication, phoneNumber.toString(), appVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;
                    setState(!state)
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        }
        else {
            alert('Please enter valid phone number')
            setLoading(false)
        }
    }

    const sendHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendOtp()
        }
    }

    const verifyOTP = (e) => {
        setLoading(true)
        if (OTP.length === 6) {
            let confirmationResult = window.confirmationResult
            confirmationResult.confirm(OTP).then((result) => {
                // User signed in successfully.

                CheckPhone(parseInt(phoneNumber.split('+92')[1])).then((res) => {
                    // login(res)
                    console.log('res>>>>>', res)
                    localStorage.setItem('lbs-token-7878p', res.data.taccessToken)
                    localStorage.setItem('lbs-user-app-web', JSON.stringify(res.data.user))
                    // global.phoneNumber.value = phoneNumber
                    setTimeout(() => {
                        router.push('/')
                        setLoading(false)
                    }, 1000)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })

                // alert('User Verified!')
                setIsVerified(true)
                // ...
            }).catch((error) => {
                setLoading(false)
                alert(error.message)
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error)
            });
        }
    }

    const verifyHandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            verifyOTP(e)
        }
    }

    return (
        <BackgroundImage src="/bg-login2.jpg" className="sm:flex sm:p-0 p-3">

            <Loader LoadingState={loading} />

            <div className="w-1/2 sm:flex hidden flex-col justify-center items-center">
                <Image
                    src="/laptop.png"
                    width={700}
                    height={400}
                    className="w-auto h-auto"
                    alt="Picture of the author"
                    quality={100}
                    priority
                />
            </div>

            <div className="sm:w-1/2 min-h-screen flex flex-col">
                <div className="w-full h-[7vh] flex sm:justify-end justify-center pt-2">
                    <div className="w-64 flex justify-evenly items-center">
                        <ImFacebook2 size={45} className='cursor-pointer text-facebook' />
                        <FaWhatsappSquare size={50} className='cursor-pointer text-whatsapp' />
                        <FaLinkedin size={50} className='cursor-pointer text-linkedin' />
                        <FaTwitterSquare size={50} className='cursor-pointer text-twitter' />
                    </div>
                </div>

                <div className="w-full sm:h-[93vh] h-[80vh] flex flex-col justify-center items-center">

                    <div className="font-tahoma flex flex-col justify-around items-center h-[55vh]">
                        <Image
                            src="/2000x2000logo.png"
                            alt="Picture of the author"
                            width={350}
                            height={100}
                            className="w-auto h-auto"
                            quality='80'
                            priority
                        />

                        <div className="w-full flex flex-col items-center">
                            <div className="text-primary text-6xl font-semibold">Welcome</div>
                            <div className="text-primary text-lg ">Login with mobile number</div>
                        </div>

                        <div className="w-[70%] flex flex-col items-center">

                            {
                                !state ?
                                    <div className="w-full flex flex-col items-center">
                                        <div className="w-[300px] py-4">

                                            <div className="text-gray-600">Mobile Number</div>
                                            <div className="flex items-center">
                                                <BsFillTelephoneFill size={25} className='text-primary' />
                                                <input
                                                    type="tel"
                                                    className="w-full border-primary border-b-2 bg-muted p-2 mb-2 ml-2 focus:outline-none"
                                                    placeholder="Enter Here"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    onKeyDown={sendHandleKeyDown}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-44 mt-6">
                                            <Btn
                                                onClick={sendOtp}
                                                rightIcon={<MdSend size={20} />}
                                            >Send OTP</Btn>
                                        </div>
                                    </div>
                                    :
                                    !isVerified ?
                                        <div className="w-full flex flex-col items-center">
                                            <div className="w-[300px]">
                                                <div className="text-gray-600">Verify your number</div>
                                                <div className="flex items-center">
                                                    <BsFillTelephoneFill size={25} className='text-primary' />
                                                    <input
                                                        type="tel"
                                                        className="w-full border-primary border-b-2 bg-muted p-2 mb-2 ml-2 focus:outline-none"
                                                        placeholder="Enter Code"
                                                        value={OTP}
                                                        onChange={(e) => setOTP(e.target.value)}
                                                        onKeyDown={verifyHandleKeyDown}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-44 mt-6 flex items-center">
                                                <Btn
                                                    onClick={verifyOTP}
                                                    rightIcon={<MdVerified size={20} />}
                                                >Verify</Btn>
                                                {/* <button className="ml-3 text-blue-400 hover:text-blue-200 transition-all" onClick={sendOtp}>Resend Code</button> */}
                                            </div>
                                        </div>
                                        :
                                        <div className="flex justify-center text-gray-500 mt-4">Verified</div>
                            }

                        </div>

                    </div>

                    <div id="recaptcha-container"></div>

                </div>
            </div>
        </BackgroundImage>
    )
}