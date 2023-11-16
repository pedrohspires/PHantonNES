import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { setCarryFlag, setNegativeFlag, setOverflowFlag, setZeroFlag } from "../bit_operations";
import { decToBin } from "../convertions";
import { isOverflow } from "../validations";

export const adc = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let content_to_add = address_mode == "immediate" ? arg : cpu.memory[address_resolve(cpu, arg, address_mode)];

    if (isOverflow(cpu.a, content_to_add))
        cpu.p = setOverflowFlag(cpu.p);

    cpu.a += content_to_add;

    if (cpu.a > 0xff) {
        cpu.p = setCarryFlag(cpu.p);
        cpu.a -= 0xff;
    }

    if (cpu.a == 0)
        cpu.p = setZeroFlag(cpu.p);

    if (decToBin(cpu.a)[0] === '1')
        cpu.p = setNegativeFlag(cpu.p);

    return cpu;
}