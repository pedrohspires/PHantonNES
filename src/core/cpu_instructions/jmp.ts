import type { addressModeType, cpuType } from "../../types/cpu.d";

function execJmp(cpu: cpuType, address_mode: addressModeType) {
    const lsb = cpu.getByteMemory();
    const msb = cpu.getByteMemory();
    const memory_address = msb << 8 | lsb;

    if (address_mode == "absolute") {
        cpu.clk += 3;
        cpu.pc = memory_address;
        return;
    }

    cpu.clk += 2;
    const indirect_lsb = cpu.getByteMemory(memory_address);
    const indirect_msb = cpu.getByteMemory(memory_address + 1);

    if (memory_address == 0x2002 || memory_address + 1 == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    cpu.pc = indirect_msb << 8 | indirect_lsb;
}

const jmp = {
    0x4c: (cpu: cpuType) => execJmp(cpu, "absolute"),
    0x6c: (cpu: cpuType) => execJmp(cpu, "indirect"),
}

export default jmp;