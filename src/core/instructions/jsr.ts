import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { updateMemoryMap } from "../memory";

export const execJsr = (cpu: cpuType): void => {
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    let address_to_jsr = addressResolve(cpu, "absolute", true);
    cpu.pc += 3;

    cpu.memory[cpu.sp] = ((cpu.pc - 1) & 0xff);
    updateMemoryMap(cpu, cpu.sp--);

    cpu.memory[cpu.sp] = (cpu.pc - 1) >> 8;
    updateMemoryMap(cpu, cpu.sp--);

    cpu.pc = address_to_jsr;
}