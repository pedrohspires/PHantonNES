import { useEffect, useState } from "react";
import Debug from "./components/Debug";
import { CpuContextProvider } from "./context/cpuContext";
import { cpuType } from "./types/cpu.d";

function Emulador() {
    const [cpu, setCpu] = useState<cpuType | null>(null);
    const [opCode, setOpCode] = useState<number>(0x00);

    useEffect(() => init(), []);

    const init = () => {
        const cpu: cpuType = {
            memory: new Array(0xffff).fill(0),
            a: 0,
            x: 0,
            y: 0,
            pc: 0xc000,
            sp: 0x01ff,
            clock: 0,
            p: "00000000" //CZIDB-VN
        }

        setCpu(cpu);
        // loop();
        execInstruction();
    }

    const loop = () => {
        while (true) {
            setOpCode(cpu?.memory[cpu.pc] || -1);

            if (opCode == -1)
                break;

            execInstruction();
        }
    }

    const execInstruction = () => {

    }

    return (
        <CpuContextProvider value={cpu}>
            <div className="w-full h-full bg-sky-900 absolute flex justify-center items-center">
                <Debug />
            </div>
        </CpuContextProvider>
    )
}

export default Emulador;
