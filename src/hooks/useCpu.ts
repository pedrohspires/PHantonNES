import { useEffect, useState } from "react";
import { instructions } from "../core/instructions";
import { cpuType } from "../types/cpu.d";

type Return = [
    cpu: cpuType,
    init: (rom: Uint8Array) => void
]

const useCpu = (): Return => {
    const [opCode, setOpCode] = useState<number>(0);
    const [cpu, setCpu] = useState<cpuType>({
        memory: new Array(0xffff).fill(0),
        a: 0,
        x: 0,
        y: 0,
        pc: 0xc000,
        sp: 0x01ff,
        clock: 0,
        p: "00000000" //CZIDB-VN
    });

    useEffect(() => {
        if (opCode) {
            const opCodeFunction = instructions[opCode];
            opCodeFunction(cpu);
            setCpu({ ...cpu });
        }
    }, [opCode]);

    const getInitialStateCpu = (cpu: cpuType) => {
        // For Tests

        // opCode executado
        cpu.memory[0x01] = 0x2d;

        // posição do opCode
        cpu.pc = 0x01;

        // argumentos do opCode
        cpu.memory[0x02] = 0x01;
        cpu.memory[0x03] = 0x02;
        cpu.memory[0x0201] = Number('0b11101010');

        // Estados iniciais
        cpu.a = Number('0b01010101');
    }

    const init = (rom: Uint8Array) => {
        // if (rom[0] == 78 && rom[1] == 69 && rom[2] == 83) {
        //     getInitialStateCpu(cpu);

        //     const part1 = cpu.memory.slice(0, 0x8000);
        //     const part2 = cpu.memory.slice(0x8000, rom.length);

        //     const memory = [...part1, ...rom, ...part2];

        //     setCpu({
        //         ...cpu,
        //         memory
        //     })

        //     loop();
        // }

        getInitialStateCpu(cpu)
        loop()
    }

    const loop = () => {
        setOpCode(cpu.memory[cpu.pc]);
    }

    return [cpu, init];
}

export default useCpu;