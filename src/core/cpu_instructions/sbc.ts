import type { addressModeType, cpuType } from "../../types/cpu.d";

function execSbc(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    const prev_a = cpu.a;
    const value_to_subtract = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (memory_address == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    cpu.a -= value_to_subtract - (1 - (cpu.p & 0b00000001));

    if (cpu.a < 0)
        cpu.a += 0x100;

    if (cpu.a > 0xff) {
        cpu.a %= 0x100;
        cpu.clearCarryFlag();
    } else cpu.setCarryFlag();

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if ((prev_a ^ cpu.a) & ~(prev_a ^ value_to_subtract) & 0x80) cpu.setOverflowFlag();
    else cpu.clearOverflowFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const sbc = {
    0xe9: (cpu: cpuType) => execSbc(cpu, "immediate"),
    0xe5: (cpu: cpuType) => execSbc(cpu, "zero_page"),
    0xf5: (cpu: cpuType) => execSbc(cpu, "zero_page_x"),
    0xed: (cpu: cpuType) => execSbc(cpu, "absolute"),
    0xfd: (cpu: cpuType) => execSbc(cpu, "absolute_x"),
    0xf9: (cpu: cpuType) => execSbc(cpu, "absolute_y"),
    0xe1: (cpu: cpuType) => execSbc(cpu, "indirect_x"),
    0xf1: (cpu: cpuType) => execSbc(cpu, "indirect_y"),
}

export default sbc;