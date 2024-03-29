import { cpuType } from "../../../types/cpu.d";
import { setCarryFlag } from "../../../utils/flags";

export const execSec = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc++;
    cpu.clock += 2;
}

const exec = (cpu: cpuType) => {
    setCarryFlag(cpu);
}