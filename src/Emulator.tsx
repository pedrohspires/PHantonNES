import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef } from "react";
import { FaFileAlt, FaPlay, FaStepForward } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Id, toast } from "react-toastify";
import Debug from "./components/Debug";
import Ppu from "./components/Ppu";
import { CpuContextProvider } from "./context/cpuContext";
import useCpu from "./hooks/useCpu";

function Emulador() {
    const [animationParent] = useAutoAnimate()
    const { cpuState, loadRom, isDebug, setIsDebug, nextStep, init, reset, readCpuMemory, writeCpuMemory } = useCpu();

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

    return (
        <CpuContextProvider value={cpuState}>
            {/* Same as */}
            <div className={`w-screen h-screen bg-sky-900 grid grid-cols-1`} >
                <div className="flex flex-col">
                    <ul className="h-12 w-full bg-black/25 flex font-bold text-white">
                        <li className="hover:bg-black/50">
                            <button onClick={() => document.getElementById(inputRomId)?.click()} className="flex place-items-center px-4 gap-2 w-full h-full">
                                <FaFileAlt />  Carregar ROM
                            </button>
                        </li>
                        <li className="hover:bg-black/50">
                            <button onClick={init} className="flex place-items-center px-4 gap-2 w-full h-full">
                                <FaPlay />  Iniciar
                            </button>
                        </li>
                        <li className="hover:bg-black/50">
                            <button onClick={reset} className="flex place-items-center px-4 gap-2 w-full h-full">
                                <GrPowerReset />  Reiniciar
                            </button>
                        </li>
                        <li className="hover:bg-black/50">
                            <button onClick={() => setIsDebug(!isDebug)} className="flex place-items-center px-4 gap-2 w-full h-full">
                                {isDebug ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}  Modo Debug
                            </button>
                        </li>
                        {isDebug && (
                            <>
                                <li className="hover:bg-black/50">
                                    <button onClick={nextStep} className="flex place-items-center px-4 gap-2 w-full h-full">
                                        <FaStepForward />  Próxima instrução
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    <div ref={animationParent} className={`w-full h-full grid ${isDebug ? "grid-cols-2" : "grid-cols-1"} place-items-center`}>
                        {isDebug && (
                            <div className="w-[512px] h-[464px]">
                                <Debug />
                            </div>
                        )}

                        <div className="w-[528px] h-[448px] rounded-md p-2 bg-sky-600">
                            <div className="w-full h-full bg-black">
                                <Ppu readCpuMemory={readCpuMemory} writeCpuMemory={writeCpuMemory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input id={inputRomId} className="hidden" type="file" onChange={handleRomSelect} accept=".nes" />
        </CpuContextProvider>
    )
}

export default Emulador;
