import { cpuType } from "../../../types/cpu.d";
import { clearOverflowFlag } from "../../../utils/flags";

export const execClv = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
}

const exec = (cpu: cpuType) => {
    cpu.clock += 2;
    clearOverflowFlag(cpu);
}