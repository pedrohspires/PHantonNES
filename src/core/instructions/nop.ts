import { cpuType } from "../../types/cpu.d";

export const execNop = (cpu: cpuType): void => {
    cpu.pc++;
}