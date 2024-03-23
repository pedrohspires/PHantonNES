import { cpuType } from "../types/cpu.d";
import Flags from "./Flags";
import Memory from "./Memory";
import Register from "./Register";

type Props = {
    cpu: cpuType,
}

export default function Debug({ cpu }: Props) {

    return (
        <div className="w-full h-full bg-sky-600 rounded-md p-4 flex flex-col gap-4">
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

            <Flags cpu={cpu} />

            <Memory cpu={cpu} />
        </div>
    )
}
