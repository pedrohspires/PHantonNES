import type { cpuType } from "../../types/cpu.d";

function execBrk(cpu: cpuType) {
    cpu.clk += 7;

    cpu.pushStack(cpu.pc >> 8);
    cpu.pushStack(cpu.pc & 0xff);
    cpu.pushStack(cpu.p);

    const lsb = cpu.memory[0xfffe];
    const msb = cpu.memory[0xffff];

    cpu.pc = msb << 8 | lsb;
    cpu.p |= 0b00100000;
}

const brk = {
    0x00: (cpu: cpuType) => execBrk(cpu),
}

export default brk;