import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearCarryFlag, clearNegativeFlag, clearOverflowFlag, setCarryFlag, setNegativeFlag, setOverflowFlag } from "../flags_operations";
import { isOverflow } from "../validations";

export const adc = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_add = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode, true)];
    let carry = Number(cpu.p[0]);

    if (isOverflow(cpu.a, content_to_add, carry)) cpu.p = setOverflowFlag(cpu.p);
    else cpu.p = clearOverflowFlag(cpu.p);

    cpu.a += content_to_add + carry;

    if (cpu.a > 0xff) {
        cpu.p = setCarryFlag(cpu.p);
        cpu.a -= 0x100;
    } else cpu.p = clearCarryFlag(cpu.p);

    if (cpu.a >> 7) cpu.p = setNegativeFlag(cpu.p);
    else cpu.p = clearNegativeFlag(cpu.p);

    return cpu;
}