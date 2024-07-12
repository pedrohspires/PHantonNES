import { useState } from "react";
import { toast } from "react-toastify";
import { instructions } from "../core/CPU/instructions";
import { cpuType } from "../types/cpu.d";
import { _16kb } from "../utils/constants";

type Return = {
    cpu: cpuType,
    loadRom: (rom: Uint8Array) => void,
    isDebug: boolean,
    setIsDebug: React.Dispatch<React.SetStateAction<boolean>>,
    nextStep: () => void,
    init: () => void,
    reset: () => void,
}

const useCpu = (): Return => {
    const cpuInitialState = {
        memory: new Array(0xffff).fill(0),
        a: 0,
        x: 0,
        y: 0,
        pc: 0xc000,
        sp: 0x01ff,
        clock: 0,
        p: "00000000" // CZIDB-VN -> indices -> 01234567
    }

    const desiredFPS = 30;
    const frameDuration = 1000 / desiredFPS;

    let lastFrameTime = 0;

    const [cpu, setCpu] = useState<cpuType>(cpuInitialState);
    const [isDebug, setIsDebug] = useState<boolean>(true);
    const [romLoaded, setRomLoaded] = useState<boolean>(false);
    const [rom, setRom] = useState<Uint8Array>(new Uint8Array());

    const isNesRom = (rom: Uint8Array) => {
        return (
            rom[0x00] == 0x4e &&
            rom[0x01] == 0x45 &&
            rom[0x02] == 0x53 &&
            rom[0x03] == 0x1a
        )
    }

    const getInitialStateCpu = (cpu: cpuType, rom: Uint8Array) => {
        cpu = cpuInitialState;

        const pgrLength = rom[4];
        const hasTrainer = !!(rom[6] >> 1 & 1);
        const startPgr = hasTrainer ? 528 : 16;

        const pgrBanks = rom.slice(startPgr, _16kb * pgrLength + startPgr);

        const startMemory = cpu.memory.slice(0, 0x8000);
        const endMemory = cpu.memory.slice(_16kb * pgrLength);

        if (pgrLength == 0x01) {
            // Mudar quando for implementar Maper diferente de 0 (PGR espelhada)
            cpu.memory = [...cpu.memory.slice(0, 0xc000), ...pgrBanks, ...pgrBanks];
            cpu.pc = (cpu.memory[0xfffd] << 8) | cpu.memory[0xfffc];

            setCpu({ ...cpu, });
            return;
        }

        cpu.memory = [
            ...startMemory,
            ...pgrBanks,
            ...endMemory
        ];
    }

    const loadRom = (rom: Uint8Array) => {
        if (isNesRom(rom)) {
            getInitialStateCpu(cpu, rom);

            setRom(rom);
            setRomLoaded(true);
        } else toast("Formato de ROM não aceita!", { type: "error" })
    }

    const loop = (currentTime: number) => {
        const timeSinceLastFrame = currentTime - lastFrameTime;

        if (timeSinceLastFrame >= frameDuration) {
            lastFrameTime = currentTime;

            execOpCode(cpu.memory[cpu.pc]);
        }

        requestAnimationFrame(loop);
    }

    const execOpCode = (opCode: number) => {
        const opCodeFunction = instructions[opCode];

        opCodeFunction(cpu);
        setCpu({ ...cpu });
    }

    const nextStep = () => romLoaded && execOpCode(cpu.memory[cpu.pc])
    const init = () => requestAnimationFrame(loop);
    const reset = () => getInitialStateCpu(cpu, rom);

    return {
        cpu,
        loadRom,
        isDebug,
        setIsDebug,
        nextStep,
        init,
        reset
    };
}

export default useCpu;