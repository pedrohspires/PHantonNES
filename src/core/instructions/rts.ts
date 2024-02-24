import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";

export const execRts = (cpu: cpuType): void => {
    cpu.pc++;
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    let pcHex = "0x";

    pcHex += formatNumber(cpu.memory[cpu.sp++], 2)
    pcHex += formatNumber(cpu.memory[cpu.sp++], 2)

    cpu.pc = Number(pcHex) - 1;
}