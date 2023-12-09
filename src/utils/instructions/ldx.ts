import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearNegativeFlag, setNegativeFlag } from "../flags_operations";

export const ldx = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_register_x = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode)];

    cpu.x = content_to_register_x;

    if (cpu.x >> 7) cpu.p = setNegativeFlag(cpu.p);
    else cpu.p = clearNegativeFlag(cpu.p);

    return cpu;
}