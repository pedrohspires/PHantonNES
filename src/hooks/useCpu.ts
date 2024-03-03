import { useState } from "react";
import { toast } from "react-toastify";
import { instructions } from "../core/instructions";
import { cpuType } from "../types/cpu.d";
import { formatNumber } from "../utils/format";

type Return = [
    cpu: cpuType,
    loadRom: (rom: Uint8Array) => void,
    isDebug: boolean,
    setDebug: React.Dispatch<React.SetStateAction<boolean>>,
    nextStep: () => void,
    init: () => void,
    reset: () => void,
]

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

    const [cpu, setCpu] = useState<cpuType>(cpuInitialState);
    const [debug, setDebug] = useState<boolean>(true);
    const [romLoaded, setRomLoaded] = useState<boolean>(false);
    const [rom, setRom] = useState<Uint8Array>(new Uint8Array());

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

    const loadRom = (rom: Uint8Array) => {
        if (rom[0] == 78 && rom[1] == 69 && rom[2] == 83) {
            getInitialStateCpu(cpu, rom);

            setRom(rom);
            setRomLoaded(true);
        } else toast("Formato de ROM não aceita!", { type: "error" })
    }

    const loop = () => {
        while (!debug && romLoaded) {
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

    const reset = () => {
        getInitialStateCpu(cpu, rom);
        setRom(rom);
    }

    return [
        cpu,
        loadRom,
        debug,
        setDebug,
        nextStep,
        init,
        reset,
    ];
}

export default useCpu;