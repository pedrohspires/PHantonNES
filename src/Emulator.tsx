import { useEffect, useState } from "react";
import Debug from "./components/Debug";
import { CpuContextProvider } from "./context/cpuContext";
import { cpuType } from "./types/cpu.d";

function Emulador() {
    const [cpu, setCpu] = useState<cpuType | null>({
        memory: new Array(0xffff).fill(0),
        a: 0,
        x: 0,
        y: 0,
        pc: 0xc000,
        sp: 0x01ff,
        clock: 0,
        p: "00000000" //CZIDB-VN
    });
    // const [opCode, setOpCode] = useState<number>(0x00);

    useEffect(() => loop(), []);

    const loop = () => {
        // while (true) {
        //     setOpCode(cpu?.memory[cpu.pc] || -1);

        //     if (opCode == -1)
        //         break;

        //     execInstruction();
        // }
        execInstruction();
    }

    const execInstruction = () => {
        if (cpu) {
            let cpuTemp = cpu;
            cpuTemp.memory[0x0003] = 0xff;
            setCpu({ ...cpuTemp })
        }

        updateMemoryMirrors(0x0003);
    }

    const updateMemoryMirrors = (addr: number) => {
        let cpuTemp = cpu;

        if (cpuTemp) {
            if (addr < 0x0800) {
                while (addr < 0x2000) {
                    cpuTemp.memory[addr + 0x0800] = cpuTemp?.memory[addr];
                    addr += 0x0800;
                }
                setCpu({ ...cpuTemp });
                return;
            }

            if (addr >= 0x2000 && addr <= 0x2007) {
                while (addr < 0x4000) {
                    cpuTemp.memory[addr + 0x8] = cpuTemp?.memory[addr];
                    addr += 0x8;
                }
                setCpu({ ...cpuTemp });
                return;
            }
        }
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
