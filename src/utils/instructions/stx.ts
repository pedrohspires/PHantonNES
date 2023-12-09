import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";

export const stx = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    cpu.memory[address_resolve(cpu, arg, address_mode)] = cpu.x;

    return cpu;
}