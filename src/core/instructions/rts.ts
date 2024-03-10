import { cpuType } from "../../types/cpu.d";

export const execRts = (cpu: cpuType): void => {
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    const msb = cpu.memory[++cpu.sp] << 8;
    const lsb = cpu.memory[++cpu.sp];

    cpu.pc = (msb | lsb) - 1;
}