import type { cpuType } from "../../types/cpu.d";

function execBcs(cpu: cpuType) {
    cpu.clk += 2;
    const memory_value = cpu.getByteMemory(undefined, true);
    if (cpu.p & 0b00000001) {
        const old_pc = cpu.pc;
        cpu.pc += memory_value;
        cpu.pc %= 0x10000;
        cpu.clk++;

        if (cpu.pc >> 8 != old_pc >> 8)
            cpu.clk += 2;
    }
}

const bcs = {
    0xb0: (cpu: cpuType) => execBcs(cpu),
}

export default bcs;