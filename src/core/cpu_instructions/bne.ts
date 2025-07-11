import type { cpuType } from "../../types/cpu.d";

function execBne(cpu: cpuType) {
    cpu.clk += 2;
    const memory_value = cpu.getByteMemory();
    if (!(cpu.p & 0b00000010)) {
        const old_pc = cpu.pc;
        cpu.pc += memory_value;
        cpu.clk++;

        if (cpu.pc >> 8 != old_pc >> 8)
            cpu.clk += 2;
    }
}

const bne = {
    0xd0: (cpu: cpuType) => execBne(cpu),
}

export default bne;