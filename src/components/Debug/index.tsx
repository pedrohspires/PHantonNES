import { cpuType } from "../../types/cpu.d"
import Flags from "../Flags";
import Memoria from "../Memoria";
import Register from "../Register";

type Props = {
    cpu: cpuType;
}

export default function Debug({ cpu }: Props) {
    return (
        <div className="bg-gray-900 p-4 text-white font-bold overflow-auto">
            <div className="w-full space-y-2">
                <div className="col-span-full w-full flex justify-evenly">
                    <Register label="A" value={cpu.a} />
                    <Register label="X" value={cpu.x} />
                    <Register label="Y" value={cpu.y} />
                </div>

                <div className="col-span-full w-full flex justify-evenly">
                    <Register label="PC" value={cpu.pc} />
                    <Register label="SP" value={cpu.sp} />
                </div>

                <div className="col-span-full w-full content-center">
                    <Flags flags={cpu.p} />
                </div>

                <div className="h-full pt-2">
                    <Memoria mem={cpu.memory} />
                </div>
            </div>
        </div>
    )
}
