import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";
import { setInterruptFlag } from "../flags";
import { updateMemoryMap } from "../memory";

export const execBrk = (cpu: cpuType): void => {
    cpu.pc++;
    exec(cpu);
    cpu.clock += 7;
}

const exec = (cpu: cpuType) => {
    cpu.memory[cpu.sp] = (cpu.pc >> 8) & 0xff;
    updateMemoryMap(cpu, cpu.sp--);
    cpu.memory[cpu.sp--] = cpu.pc % 0x100;
    updateMemoryMap(cpu, cpu.sp--);
    cpu.memory[cpu.sp--] = Number("0b" + cpu.p);
    updateMemoryMap(cpu, cpu.sp--);

    let vetInterrupt = "0x" + formatNumber(cpu.memory[0xffff], 2, 16) + formatNumber(cpu.memory[0xfffe], 2, 16);

    cpu.pc = Number(vetInterrupt);
    setInterruptFlag(cpu);
}