import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef } from "react";
import { Id, toast } from "react-toastify";
import Debug from "./components/Debug";
import Menu from "./components/Menu";
import useCpu from "./hooks/useCpu";

function Emulador() {
    const [animationParent] = useAutoAnimate();
    const loadingRef = useRef<Id | any>();
    const inputRomId = "input-rom";

    const {
        loadRom,
        init,
        reset,
        nextStep,
        cpu,
        isDebug,
        setIsDebug
    } = useCpu();

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
