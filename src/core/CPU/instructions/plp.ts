import { cpuType } from "../../../types/cpu.d";
import { formatNumber } from "../../../utils/format";

export const execPlp = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 1;
    cpu.clock += 4;
}

const exec = (cpu: cpuType) => {
    cpu.p = formatNumber(cpu.memory[++cpu.sp], 8, 2);
}