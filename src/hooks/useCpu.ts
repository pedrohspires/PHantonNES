import { useEffect, useState } from "react";
import { cpuType, op_codes_type } from "../types/cpu.d";
import { clearZeroFlag, setZeroFlag } from "../utils/flags_operations";
import { initial_cpu } from "../utils/initial_states";
import op_codes from "../utils/op_codes";

type useCpuReturn = {
    cpu: cpuType,
    exec_op_code: (code: op_codes_type, arg: number) => void,
    reset_cpu: () => void
}

export function useCpu(): useCpuReturn {
    const [cpu, setCpu] = useState<cpuType>(initial_cpu)

    useEffect(() => {
        let cpuTemp = cpu;

        cpuTemp.memory[0x03] = 0x0a;
        cpuTemp.a = 0x0a;

        setCpu(cpuTemp);
    }, []);

    useEffect(() => {
        cpu.p = cpu.a == 0 ? setZeroFlag(cpu.p) : clearZeroFlag(cpu.p);
        setCpu({ ...cpu });
    }, [cpu.a]);

    const exec_op_code = (code: op_codes_type, arg: number): void => {
        let cpuTemp = op_codes[code](cpu, arg);
        setCpu({ ...cpuTemp });
    }

    const reset_cpu = () => {
        setCpu({ ...initial_cpu });
    }

    return { cpu, exec_op_code, reset_cpu };
}