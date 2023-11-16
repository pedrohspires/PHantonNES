import { useState } from "react";
import { cpuType } from "../types/cpu.d";
import instructions from "../utils/instructions";

export function useCpu(): [cpu: cpuType, exec_op_code: (code: "69", arg: number) => void] {
    const [cpu, setCpu] = useState<cpuType>({
        memory: new Array(0xffff),
        x: 0x00,
        y: 0x00,
        a: 0x00,
        sp: 0x00,
        pc: 0x0000,
        p: "00000000", // CZIDB-VN
        cycle: 0x0000,
    })

    const exec_op_code = (code: "69" | "65", arg: number): void => {
        setCpu(instructions[code](cpu, arg));
    }

    return [cpu, exec_op_code];
}