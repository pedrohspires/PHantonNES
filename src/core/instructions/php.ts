import { cpuType } from "../../types/cpu.d";

export const execPhp = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 3;
}

const exec = (cpu: cpuType) => {
    cpu.memory[cpu.sp--] = Number("0b" + cpu.p);
}