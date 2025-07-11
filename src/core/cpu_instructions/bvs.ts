import type { cpuType } from "../../types/cpu.d";

function execBvs(cpu: cpuType) {
    cpu.clk += 2;
    const memory_value = cpu.getByteMemory(undefined, true);
    if (cpu.p & 0b01000000) {
        const old_pc = cpu.pc;
        cpu.pc += memory_value;
        cpu.clk++;

        if (cpu.pc >> 8 != old_pc >> 8)
            cpu.clk += 2;
    }
}

const bvs = {
    0x70: (cpu: cpuType) => execBvs(cpu),
}

export default bvs;