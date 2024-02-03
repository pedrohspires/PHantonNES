import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";
import { setInterruptFlag } from "../flags";

export const execBrk = (cpu: cpuType): void => {
    exec(cpu);
    cpu.clock += 7;
}

const exec = (cpu: cpuType) => {
    cpu.pc++;

    let pcHex = formatNumber(cpu.pc);

    cpu.memory[cpu.sp--] = Number("0x" + pcHex.substring(0, 2));
    cpu.memory[cpu.sp--] = Number("0x" + pcHex.substring(2, 4));
    cpu.memory[cpu.sp--] = Number("0b" + cpu.p);

    let vetInterrupt = "0x" + formatNumber(cpu.memory[0xffff], 2, 16) + formatNumber(cpu.memory[0xfffe], 2, 16);

    cpu.pc = Number(vetInterrupt);
    setInterruptFlag(cpu);
}