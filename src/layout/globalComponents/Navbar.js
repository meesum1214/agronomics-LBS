import Image from "next/image";
import Btn from "./Btn";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { HoverCard } from "@mantine/core";

export default () => {
    const router = useRouter();
    return (
        <div className="flex justify-center bg-white p-2">
            <div className="max-w-[1100px] w-full flex justify-between items-center">
                <div className="w-40 cursor-pointer" onClick={() => router.push('/')}>
                    <Image
                        src="/2000x2000logo.png"
                        alt="Agronomics Logo"
                        width={500}
                        height={500}
                        priority
                        className="w-auto h-auto"
                    />
                </div>

                <div className="flex items-center">
                    <a href="https://play.google.com/store/apps/details?id=com.agronomics.app&hl=en_US&gl=US" target="_blank" className="bg-secondary text-white text-sm font-bold py-1 px-3 mr-2 rounded-full">Mobile App</a>
                    <Btn onClick={() => {
                        localStorage.removeItem('lbs-user-app-web');
                        localStorage.removeItem('lbs-token-7878p');
                        router.reload()
                    }}>Logout</Btn>
                </div>
            </div>
        </div>
    )
}