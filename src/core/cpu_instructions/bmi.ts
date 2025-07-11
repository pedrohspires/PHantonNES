import type { cpuType } from "../../types/cpu.d";

function execBmi(cpu: cpuType) {
    cpu.clk += 2;
    const memory_value = cpu.getByteMemory();
    if (cpu.p & 0b10000000) {
        const old_pc = cpu.pc;
        cpu.pc += memory_value;
        cpu.clk++;

        if (cpu.pc >> 8 != old_pc >> 8)
            cpu.clk += 2;
    }
}

const bmi = {
    0x30: (cpu: cpuType) => execBmi(cpu),
}

export default bmi;