import Image from "next/image";
import Btn from "./Btn";
import { FaUserAlt } from "react-icons/fa";

export default () => (
    <div className="bg-white p-2 w-full flex justify-between items-center">
        <div className="w-40">
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
            <Btn onClick={() => { }}>Mobile App</Btn>
            <FaUserAlt className="text-secondary ml-2" size={20} />
        </div>
    </div>
)