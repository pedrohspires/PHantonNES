import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearNegativeFlag, setNegativeFlag } from "../flags_operations";

export const and = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_and = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode)];

    cpu.a = cpu.a & content_to_and;

    if (cpu.a >> 7) cpu.p = setNegativeFlag(cpu.p);
    else cpu.p = clearNegativeFlag(cpu.p);

    return cpu;
}