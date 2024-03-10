import { cpuType } from "../../../types/cpu.d";
import { clearInterruptFlag } from "../flags";

export const execCli = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
}

const exec = (cpu: cpuType) => {
    cpu.clock += 2;
    clearInterruptFlag(cpu);
}