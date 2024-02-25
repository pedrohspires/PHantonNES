import { useState } from "react";
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
    log: Array<string>
]

const useCpu = (): Return => {
    const [cpu, setCpu] = useState<cpuType>({
        memory: new Array(0xffff).fill(0),
        a: 0,
        x: 0,
        y: 0,
        pc: 0xc000,
        sp: 0x01ff,
        clock: 0,
        p: "00000000" // CZIDB-VN -> indices -> 01234567
    });
    const [debug, setDebug] = useState<boolean>(false);
    const [romLoaded, setRomLoaded] = useState<boolean>(false);
    const [log, setLog] = useState<Array<string>>([]);
    const [rom, setRom] = useState<Uint8Array>(new Uint8Array());

    const getInitialStateCpu = (cpu: cpuType, rom: Uint8Array) => {
        const pgrLength = rom[4];
        const _16bits = 16384;
        const hasTrainer = !!(rom[6] >> 1 & 1);
        const startPgr = hasTrainer ? 529 : 16;
        const pgrBanks = rom.slice(startPgr, _16bits * pgrLength + startPgr);

        cpu.memory = [
            ...cpu.memory.slice(0, 0x8000),
            ...pgrBanks.slice(0, 2 * _16bits + 1),
            ...cpu.memory.slice(pgrLength * _16bits + 1, 0x10000)
        ]

        if (pgrLength == 1)
            cpu.memory = [...cpu.memory.slice(0, 0xc000), ...pgrBanks];

        cpu.pc = (cpu.memory[0xfffd] << 8) | cpu.memory[0xfffc];
        console.log(cpu.pc)
    }

    const loadRom = (rom: Uint8Array) => {
        if (rom[0] == 78 && rom[1] == 69 && rom[2] == 83) {
            getInitialStateCpu(cpu, rom);

            setCpu({ ...cpu, })
            setRom(rom);
            addLog(`ROM carregada!`);
            setRomLoaded(true);
        }
    }

    const loop = () => {
        while (!debug && romLoaded) {
            execOpCode(cpu.memory[cpu.pc])
        }
    }

    const execOpCode = (opCode: number) => {
        logOpCode(opCode);
        const opCodeFunction = instructions[opCode];

        opCodeFunction(cpu);
        setCpu({ ...cpu });
    }

    const logOpCode = (opCode: number) => {
        let instruction = instructions[opCode]?.toString()?.split(" => exec")[1]?.split("(")[0]
        let addressMode = instructions[opCode]?.toString()?.split('(cpu, "')[1]?.split('")')[0]

        addLog(`
            PC: 0x${formatNumber(cpu.pc || 0)} <br/>
            OPCODE: 0x${formatNumber(opCode || 0, 2)} <br/>
            INSTRUCTION: ${instruction} <br/>
            ADDRESS MODE: ${addressMode || "Implied"}
        `)
    }

    const nextStep = () => romLoaded && execOpCode(cpu.memory[cpu.pc])

    const init = () => loop();

    const addLog = (strLog: string) => {
        let logAux = log;
        if (log.length > 10000)
            logAux = ["CLEAR LOG", "----------"];
        else {
            logAux.push(strLog)
            logAux.push("----------")
        }

        setLog(logAux);
    }

    const reset = () => {
        getInitialStateCpu(cpu, rom);

        setCpu({ ...cpu, })
        setRom(rom);
        addLog(`Sistema resetado!`);
    }

    return [
        cpu,
        loadRom,
        debug,
        setDebug,
        nextStep,
        init,
        reset,
        log
    ];
}

export default useCpu;