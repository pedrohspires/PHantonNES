import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearNegativeFlag, setNegativeFlag } from "../flags_operations";

export const ldy = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_register_y = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode)];

    cpu.y = content_to_register_y;

    if (cpu.y >> 7) cpu.p = setNegativeFlag(cpu.p);
    else cpu.p = clearNegativeFlag(cpu.p);

    return cpu;
}