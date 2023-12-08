import { useEffect, useState } from "react";
import { cpuType, op_codes } from "../types/cpu.d";
import instructions from "../utils/instructions";
import { clearZeroFlag, setZeroFlag } from "../utils/bit_operations";

export function useCpu(): { cpu: cpuType, exec_op_code: (code: op_codes, arg: number) => void } {
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
        cpu.memory[0x03] = 0x03;

        setCpu({ ...cpuTemp });
    }, []);

    useEffect(() => {
        cpu.p = cpu.a == 0 ? setZeroFlag(cpu.p) : clearZeroFlag(cpu.p);
    }, [cpu.a]);

    const exec_op_code = (code: op_codes, arg: number): void => {
        let cpuTemp = instructions[code](cpu, arg);
        setCpu({ ...cpuTemp });
    }

    return { cpu, exec_op_code };
}