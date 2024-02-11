import { cpuType } from "../../types/cpu.d";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execDex = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 2
}

const exec = (cpu: cpuType) => {
    cpu.x--;

    cpu.x == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.x >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}