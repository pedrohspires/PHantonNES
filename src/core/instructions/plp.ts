import { cpuType } from "../../types/cpu.d";

export const execPlp = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 4;
}

const exec = (cpu: cpuType) => {
    cpu.p = cpu.memory[cpu.sp++].toString(2);
}