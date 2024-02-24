import { cpuType } from "../../types/cpu.d";
import { setDecimalFlag } from "../flags";

export const execSed = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc++;
    cpu.clock += 2;
}

const exec = (cpu: cpuType) => {
    setDecimalFlag(cpu);
}