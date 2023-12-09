import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearNegativeFlag, setNegativeFlag } from "../flags_operations";

export const lda = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_register_a = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode)];

    cpu.a = content_to_register_a;

    if (cpu.a >> 7) cpu.p = setNegativeFlag(cpu.p);
    else cpu.p = clearNegativeFlag(cpu.p);

    return cpu;
}