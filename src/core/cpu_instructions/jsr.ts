import type { cpuType } from "../../types/cpu.d";

function execJsr(cpu: cpuType) {
    const lsb = cpu.getByteMemory();
    const msb = cpu.getByteMemory();
    const memory_address = msb << 8 | lsb;

    cpu.pushStack((cpu.pc - 1) >> 8);
    cpu.pushStack((cpu.pc - 1) & 0xff);

    cpu.pc = memory_address;
    cpu.clk += 6;
}

const jsr = {
    0x20: (cpu: cpuType) => execJsr(cpu),
}

export default jsr;