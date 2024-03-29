import { cpuType } from "../../../types/cpu.d";
import { setInterruptFlag } from "../../../utils/flags";

export const execSei = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc++;
    cpu.clock += 2;
}

const exec = (cpu: cpuType) => {
    setInterruptFlag(cpu);
}