import { cpuType } from "../../../types/cpu.d";
import { clearDecimalFlag } from "../../../utils/flags";

export const execCld = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
}

const exec = (cpu: cpuType) => {
    cpu.clock += 2;
    clearDecimalFlag(cpu);
}