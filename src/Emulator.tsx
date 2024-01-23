import { useEffect } from "react";
import Debug from "./components/Debug";
import { CpuContextProvider } from "./context/cpuContext";
import useCpu from "./hooks/useCpu";

function Emulador() {
    const [cpu, init] = useCpu();
    // const [opCode, setOpCode] = useState<number>(0x00);

    useEffect(() => {

    }, []);

    // const loop = () => {
    //     // while (true) {
    //     //     setOpCode(cpu?.memory[cpu.pc] || -1);

    //     //     if (opCode == -1)
    //     //         break;

    //     //     execInstruction();
    //     // }
    //     execInstruction();
    // }

    // const getInicialStateCpu = (): cpuType | undefined => {
    //     if (cpu) {
    //         setMemory(0x0003, 0xff);
    //     }
    // }

    // const execInstruction = () => {
    //     const inicialStateCpu = getInicialStateCpu();
    //     if (inicialStateCpu)
    //         setCpu({ ...inicialStateCpu })
    // }

    // const setMemory = (addr: number, value: number) => {
    //     let cpuTemp = cpu;
    //     if (cpuTemp) {
    //         cpuTemp.memory[addr] = value;
    //         updateMemoryMirrors(addr);
    //     }
    // }

    // const updateMemoryMirrors = (addr: number) => {
    //     let cpuTemp = cpu;

    //     if (cpuTemp) {
    //         if (addr < 0x0800) {
    //             while (addr < 0x2000) {
    //                 cpuTemp.memory[addr + 0x0800] = cpuTemp?.memory[addr];
    //                 addr += 0x0800;
    //             }
    //             setCpu({ ...cpuTemp });
    //             return;
    //         }

    //         if (addr >= 0x2000 && addr <= 0x2007) {
    //             while (addr < 0x4000) {
    //                 cpuTemp.memory[addr + 0x8] = cpuTemp?.memory[addr];
    //                 addr += 0x8;
    //             }
    //             setCpu({ ...cpuTemp });
    //             return;
    //         }
    //     }
    // }

    const handleRomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = event => {
                if (event.target?.result) {
                    const rom = new Uint8Array(event.target?.result as ArrayBuffer);
                    init(rom);
                }
            }

            reader.readAsArrayBuffer(event.target.files[0]);
        }
    }

    return (
        <CpuContextProvider value={cpu}>
            <input type="file" onChange={handleRomSelect} accept=".nes" />

            <div className="w-full h-full bg-sky-900 absolute flex justify-center items-center">
                <Debug />
            </div>
        </CpuContextProvider>
    )
}

export default Emulador;
