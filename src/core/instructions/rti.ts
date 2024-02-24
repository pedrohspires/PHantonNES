import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";

export const execRti = (cpu: cpuType): void => {
    cpu.pc++;
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    let pcHex = "0x";

    cpu.p = formatNumber(cpu.memory[cpu.sp++], 8, 2);
    pcHex += formatNumber(cpu.memory[cpu.sp++], 2)
    pcHex += formatNumber(cpu.memory[cpu.sp++], 2)
    cpu.pc = Number(pcHex);
}