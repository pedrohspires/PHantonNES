import { MouseEventHandler } from 'react';
import { FaFileAlt, FaPlay, FaStepForward } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

type Props = {
    onClickLoadRom: MouseEventHandler<HTMLButtonElement>,
    onClickInit: MouseEventHandler<HTMLButtonElement>,
    onClickReset: MouseEventHandler<HTMLButtonElement>,
    onClickNextStep: MouseEventHandler<HTMLButtonElement>,
    isDebug: boolean,
    setIsDebug: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Menu(props: Props) {
    const {
        onClickLoadRom,
        onClickInit,
        onClickReset,
        onClickNextStep,
        isDebug,
        setIsDebug
    } = props;

    return (
        <ul className="h-12 w-full bg-black/25 flex font-bold text-white">
            <li className="hover:bg-black/50">
                <button onClick={onClickLoadRom} className="flex place-items-center px-4 gap-2 w-full h-full">
                    <FaFileAlt />  Carregar ROM
                </button>
            </li>

            <li className="hover:bg-black/50">
                <button onClick={onClickInit} className="flex place-items-center px-4 gap-2 w-full h-full">
                    <FaPlay />  Iniciar
                </button>
            </li>

            <li className="hover:bg-black/50">
                <button onClick={onClickReset} className="flex place-items-center px-4 gap-2 w-full h-full">
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
                        <button onClick={onClickNextStep} className="flex place-items-center px-4 gap-2 w-full h-full">
                            <FaStepForward />  Próxima instrução
                        </button>
                    </li>
                </>
            )}
        </ul>
    )
}
