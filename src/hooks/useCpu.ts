import { useEffect, useState } from "react";
import { cpuType } from "../types/cpu.d";

type Return = [
    cpu: cpuType,
    init: (rom: Uint8Array) => void
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
        p: "00000000" //CZIDB-VN
    });

    useEffect(() => {

    }, []);

    const init = (rom: Uint8Array) => {
        if (rom[0] == 78 && rom[1] == 69 && rom[2] == 83) {
            const part1 = cpu.memory.slice(0, 0x8000);
            const part2 = cpu.memory.slice(0x8000, rom.length);

            const memory = [...part1, ...rom, ...part2];

            setCpu({
                ...cpu,
                memory
            })
        }
    }

    return [cpu, init];
}

export default useCpu;