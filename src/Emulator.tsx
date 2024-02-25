import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef, useState } from "react";
import { FaFileAlt, FaPlay, FaStepForward } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Id, toast } from "react-toastify";
import Debug from "./components/Debug";
import Modal from "./components/Modal";
import ModalLateral from "./components/ModalLateral";
import { CpuContextProvider } from "./context/cpuContext";
import useCpu from "./hooks/useCpu";

function Emulador() {
    const [cpu, loadRom, isDebug, setDebug, nextStep, init, reset, log] = useCpu();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalLoglOpen, setModalLogOpen] = useState<boolean>(false);
    const loadingRef = useRef<Id | any>();
    const [animationParent] = useAutoAnimate()

    const handleRomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        loadingRef.current = toast.loading("Carregando ROM")

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = event => {
                if (event.target?.result) {
                    const rom = new Uint8Array(event.target?.result as ArrayBuffer);
                    loadRom(rom);
                    setModalOpen(false);
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
        <CpuContextProvider value={cpu}>
            {/* Same as */}
            <div className={`w-screen h-screen bg-sky-900 grid grid-cols-1`} >
                <div className="flex flex-col">
                    <ul className="h-12 w-full bg-black/25 flex font-bold text-white">
                        <li className="hover:bg-black/50">
                            <button onClick={() => setModalOpen(true)} className="flex place-items-center px-4 gap-2 w-full h-full">
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
                            <button onClick={() => setDebug(!isDebug)} className="flex place-items-center px-4 gap-2 w-full h-full">
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
                        <li className="hover:bg-black/50">
                            <button onClick={() => setModalLogOpen(!modalLoglOpen)} className="flex place-items-center px-4 gap-2 w-full h-full">
                                {modalLoglOpen ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}  Ver log
                            </button>
                        </li>
                    </ul>

                    <div ref={animationParent} className={`w-full h-full grid ${isDebug ? "grid-cols-2" : "grid-cols-1"} place-items-center`}>
                        {isDebug && (
                            <div className="w-[512px] h-4/6">
                                <Debug />
                            </div>
                        )}

                        <div className="w-[528px] h-[448px] rounded-md p-2 bg-sky-600">
                            <div className="w-full h-full bg-black"></div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                titulo="Selecione a ROM"
                isOpen={modalOpen}
                closeModal={setModalOpen}
            >
                <div>
                    <input type="file" onChange={handleRomSelect} accept=".nes" />
                </div>
            </Modal>

            <ModalLateral
                titulo="LOG"
                isOpen={modalLoglOpen}
                closeModal={setModalLogOpen}
                notCloseOnClickOverlay
            >
                <div>
                    {log.map((item, index) => <div key={item + "_" + index} dangerouslySetInnerHTML={{ __html: item }} />)}
                </div>
            </ModalLateral>
        </CpuContextProvider>
    )
}

export default Emulador;
