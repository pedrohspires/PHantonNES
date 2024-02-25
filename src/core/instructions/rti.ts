import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";

export const execRti = (cpu: cpuType): void => {
    cpu.pc++;
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    cpu.p = formatNumber(cpu.memory[++cpu.sp], 8, 2);

    const msb = cpu.memory[++cpu.sp] << 8;
    const lsb = cpu.memory[++cpu.sp];

    cpu.pc = msb | lsb;
}