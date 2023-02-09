import Image from "next/image"
import { useRouter } from "next/router"
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa"
import { ImFacebook2, ImLinkedin } from 'react-icons/im'

export default () => {
    const router = useRouter()
    return (
        <footer className="text-gray-600 bg-gray-800 flex flex-col items-center z-50">
            <div className="max-w-[1100px] py-7 md:px-0 px-10 w-full flex sm:flex-row justify-between flex-col items-center">

                <div onClick={() => router.push('/')} className='cursor-pointer w-[200px]'>
                    <Image
                        src="/2000x2000logo.png"
                        width={300}
                        height={300}
                        alt="logo"
                        priority
                        className='cursor-pointer w-auto h-auto'
                    />
                </div>

                <div className="sm:w-96 flex sm:flex-row sm:justify-between flex-col items-center text-gray-400 font-semibold">
                    <a href="http://agronomics.pk/" target="_blank" className="mt-2 cursor-pointer hover:text-gray-200 transition-all">Profile</a>
                    <a href="http://agronomics.pk/about/" target="_blank" className="mt-2 cursor-pointer hover:text-gray-200 transition-all">About</a>
                    <a href="http://agronomics.pk/services/" target="_blank" className="mt-2 cursor-pointer hover:text-gray-200 transition-all">Services</a>
                    <a href="http://agronomics.pk/objectives/" target="_blank" className="mt-2 cursor-pointer hover:text-gray-200 transition-all">Objectives</a>
                </div>

            </div>

            <div className=' w-full flex justify-center py-4 px-10'>
                <div className="w-full max-w-[1100px] flex sm:flex-row sm:justify-between flex-col items-center">
                    <p className="text-white text-sm text-center sm:text-left">© 2022 All Rights Reserved</p>
                    <div className='flex justify-between items-center w-40 mt-4 text-white'>
                        <ImFacebook2 size={25} className='cursor-pointer' />
                        <a href="https://twitter.com/agronomics_pk" target="_blank"><FaTwitterSquare size={29} className='cursor-pointer' /></a>
                        <a href="https://www.instagram.com/agronomics_pk/?igshid=YmMyMTA2M2Y%3D" target="_blank"><FaInstagramSquare size={29} className='cursor-pointer' /></a>
                        <a href="https://www.linkedin.com/company/agronomics-private-limited/" target="_blank"><ImLinkedin size={25} className='cursor-pointer' /></a>
                    </div>
                </div>
            </div>

        </footer>
    )
}