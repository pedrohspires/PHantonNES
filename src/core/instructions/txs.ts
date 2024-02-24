import { cpuType } from "../../types/cpu.d";

export const execTxs = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 2;
}

const exec = (cpu: cpuType) => {
    cpu.sp = cpu.x;
}