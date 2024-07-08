import { cpuType } from "../../../types/cpu.d";
import { getCombinedAddress } from "../../../utils/address";
import { setInterruptFlag } from "../../../utils/flags";
import { updateMemoryMap } from "../../../utils/memory";

export const execBrk = (cpu: cpuType): void => {
    exec(cpu);
    cpu.clock += 7;
}

const exec = (cpu: cpuType) => {
    cpu.pc++;

    // LSB na pilha
    cpu.memory[cpu.sp] = cpu.pc & 0xff;
    updateMemoryMap(cpu, cpu.sp--);

    // MSB na pilha
    cpu.memory[cpu.sp--] = cpu.pc >> 8;
    updateMemoryMap(cpu, cpu.sp--);

    // Status na pilha
    cpu.memory[cpu.sp--] = Number("0b" + cpu.p);
    updateMemoryMap(cpu, cpu.sp--);

    cpu.pc = getCombinedAddress(cpu.memory[0xfffa], cpu.memory[0xfffb]);
    setInterruptFlag(cpu);
}