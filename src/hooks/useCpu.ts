import { useEffect, useState } from "react";
import { cpuType, op_codes } from "../types/cpu.d";
import { clearZeroFlag, setZeroFlag } from "../utils/flags_operations";
import { initial_cpu } from "../utils/initial_states";
import instructions from "../utils/instructions";

type useCpuReturn = {
    cpu: cpuType,
    exec_op_code: (code: op_codes, arg: number) => void,
    reset_cpu: () => void
}

export function useCpu(): useCpuReturn {
    const [cpu, setCpu] = useState<cpuType>(initial_cpu)

    useEffect(() => {
        cpu.p = cpu.a == 0 ? setZeroFlag(cpu.p) : clearZeroFlag(cpu.p);
        setCpu({ ...cpu });
    }, [cpu.a]);

    const exec_op_code = (code: op_codes, arg: number): void => {
        let cpuTemp = instructions[code](cpu, arg);
        setCpu({ ...cpuTemp });
    }

    const reset_cpu = () => {
        setCpu({ ...initial_cpu });
    }

    return { cpu, exec_op_code, reset_cpu };
}