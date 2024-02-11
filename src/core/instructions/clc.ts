import { cpuType } from "../../types/cpu.d";
import { clearCarryFlag } from "../flags";

export const execClc = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
}

const exec = (cpu: cpuType) => {
    cpu.clock += 2;
    clearCarryFlag(cpu);
}