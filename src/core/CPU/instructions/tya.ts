import { cpuType } from "../../../types/cpu.d";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../../../utils/flags";

export const execTya = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 2;
}

const exec = (cpu: cpuType) => {
    cpu.a = cpu.y;

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.a >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}