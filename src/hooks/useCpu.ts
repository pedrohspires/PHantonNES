import { useEffect, useState } from "react";
import { cpuType, op_codes } from "../types/cpu.d";
import instructions from "../utils/instructions";

export function useCpu(): [cpu: cpuType, exec_op_code: (code: op_codes, arg: number) => void] {
    const [cpu, setCpu] = useState<cpuType>({
        memory: new Array(0xffff).fill(0),
        x: 0x00,
        y: 0x00,
        a: 0x00,
        sp: 0x00,
        pc: 0x0000,
        p: "00000000", // CZIDB-VN
        cycle: 0x0000,
    })

    useEffect(() => {
        let cpuTemp = cpu;

        cpu.a = 0xff;
        cpu.memory[0x00] = 0x01;

        setCpu({ ...cpuTemp });
    }, []);

    const exec_op_code = (code: op_codes, arg: number): void => {
        let cpuTemp = instructions[code](cpu, arg);
        setCpu({ ...cpuTemp });
    }

    return [cpu, exec_op_code];
}