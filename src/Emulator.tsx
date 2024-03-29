import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import Debug from "./components/Debug";
import Menu from "./components/Menu";
import { instructions } from "./core/CPU/instructions";
import { cpuType } from "./types/cpu.d";
import cpuInitialState from "./utils/cpuInitialState";
import { formatNumber } from "./utils/format";

function Emulador() {
    const [animationParent] = useAutoAnimate();

    const [cpu, setCpu] = useState<cpuType>(cpuInitialState);
    const [isDebug, setIsDebug] = useState<boolean>(true);
    const [romLoaded, setRomLoaded] = useState<boolean>(false);
    const [rom, setRom] = useState<Uint8Array>(new Uint8Array());

    const loadingRef = useRef<Id | any>();
    const inputRomId = "input-rom";

    const handleRomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        loadingRef.current = toast.loading("Carregando ROM")

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = event => {
                if (event.target?.result) {
                    const rom = new Uint8Array(event.target?.result as ArrayBuffer);
                    loadRom(rom)
                    toast.update(loadingRef.current, {
                        type: "success",
                        render: "ROM carregada!",
                        autoClose: 5000,
                        isLoading: false
                    });
                }
            }

            reader.readAsArrayBuffer(event.target.files[0]);
        }
    }

    const loadRom = (rom: Uint8Array) => {
        if (rom[0] == 78 && rom[1] == 69 && rom[2] == 83) {
            getInitialStateCpu(cpu, rom);

            setRom(rom);
            setRomLoaded(true);
        } else toast("Formato de ROM não aceita!", { type: "error" })
    }

    const getInitialStateCpu = (cpu: cpuType, rom: Uint8Array) => {
        const pgrLength = rom[4];
        const _16bits = 16384;
        const hasTrainer = !!(rom[6] >> 1 & 1);
        const startPgr = hasTrainer ? 529 : 16;
        const pgrBanks = rom.slice(startPgr, _16bits * pgrLength + startPgr);

        cpu = cpuInitialState;
        cpu.memory = [
            ...cpu.memory.slice(0, 0x8000),
            ...pgrBanks.slice(0, 2 * _16bits + 1),
            ...cpu.memory.slice(pgrLength * _16bits + 1, 0x10000)
        ]

        if (pgrLength == 1)
            cpu.memory = [...cpu.memory.slice(0, 0xc000), ...pgrBanks];

        cpu.pc = (cpu.memory[0xfffd] << 8) | cpu.memory[0xfffc];
        setCpu({ ...cpu, });
    }

    const loop = () => {
        while (romLoaded) {
            execOpCode(cpu.memory[cpu.pc])
        }
    }

    const execOpCode = (opCode: number) => {
        const opCodeFunction = instructions[opCode];

        console.log(formatNumber(opCode, 2), ": ", opCodeFunction)

        opCodeFunction(cpu);
        setCpu({ ...cpu });
    }

    const nextStep = () => romLoaded && execOpCode(cpu.memory[cpu.pc])
    const init = () => loop();
    const reset = () => getInitialStateCpu(cpu, rom);

    return (
        <>
            {/* Same as */}
            <div className={`w-screen h-screen bg-sky-900 grid grid-cols-1`} >
                <div className="flex flex-col">
                    <Menu
                        onClickLoadRom={() => document.getElementById(inputRomId)?.click()}
                        onClickInit={init}
                        onClickReset={reset}
                        onClickNextStep={nextStep}
                        isDebug={isDebug}
                        setIsDebug={setIsDebug}
                    />

                    <div ref={animationParent} className={`w-full h-full grid ${isDebug ? "grid-cols-2" : "grid-cols-1"} place-items-center`}>
                        {isDebug && (
                            <div className="w-[512px] h-[464px]">
                                <Debug cpu={cpu} />
                            </div>
                        )}

                        <div className="w-[528px] h-[448px] rounded-md p-2 bg-sky-600">
                            <div className="w-full h-full bg-black">
                                {/* <Ppu readCpuMemory={readCpuMemory} writeCpuMemory={writeCpuMemory} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input id={inputRomId} className="hidden" type="file" onChange={handleRomSelect} accept=".nes" />
        </>
    )
}

export default Emulador;
