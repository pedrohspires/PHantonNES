import { useContext } from "react";
import cpuContext from "../../context/cpuContext";
import Flags from "../Flags";
import Memory from "../Memory";
import Register from "../Register";

export default function Debug() {
    const cpu = useContext(cpuContext);

    return (
        <div className="w-3/6 h-2/3 relative bg-sky-800 rounded-md p-4 flex flex-col gap-4">
            <div className="w-full flex justify-evenly">
                <Register value={cpu !== null ? cpu?.a : null} label="A" />
                <Register value={cpu !== null ? cpu?.x : null} label="X" />
                <Register value={cpu !== null ? cpu?.y : null} label="Y" />
            </div>

            <div className="w-full flex justify-evenly">
                <Register value={cpu !== null ? cpu?.pc : null} label="PC" is16Bits />
                <Register value={cpu !== null ? cpu?.sp : null} label="SP" is16Bits />
                <Register value={cpu !== null ? cpu?.clock : null} label="Clock" is16Bits />
            </div>

            <Flags />

            <Memory />
        </div>
    )
}
