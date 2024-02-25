import { cpuType } from "../../types/cpu.d";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execPla = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 4;
}

const exec = (cpu: cpuType) => {
    cpu.a = cpu.memory[++cpu.sp];

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.a >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}