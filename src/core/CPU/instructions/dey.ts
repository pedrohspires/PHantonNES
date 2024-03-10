import { cpuType } from "../../../types/cpu.d";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execDey = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 2
}

const exec = (cpu: cpuType) => {
    cpu.y--;

    cpu.y == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.y >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}