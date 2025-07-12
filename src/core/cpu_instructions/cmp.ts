import type { addressModeType, cpuType } from "../../types/cpu.d";

function execCmp(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    const memory_value = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (memory_address == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    if (cpu.a >= memory_value) cpu.setCarryFlag();
    else cpu.clearCarryFlag();

    if (cpu.a == memory_value) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if ((cpu.a - memory_value) >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const cmp = {
    0xc9: (cpu: cpuType) => execCmp(cpu, "immediate"),
    0xc5: (cpu: cpuType) => execCmp(cpu, "zero_page"),
    0xd5: (cpu: cpuType) => execCmp(cpu, "zero_page_x"),
    0xcd: (cpu: cpuType) => execCmp(cpu, "absolute"),
    0xdd: (cpu: cpuType) => execCmp(cpu, "absolute_x"),
    0xd9: (cpu: cpuType) => execCmp(cpu, "absolute_y"),
    0xc1: (cpu: cpuType) => execCmp(cpu, "indirect_x"),
    0xd1: (cpu: cpuType) => execCmp(cpu, "indirect_y"),
}

export default cmp;