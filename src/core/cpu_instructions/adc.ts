import type { addressModeType, cpuType } from "../../types/cpu.d";

function execAdc(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    const prev_a = cpu.a;
    cpu.a += address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    cpu.a += cpu.p & 0b00000001;

    if (cpu.a > 0xff) {
        cpu.a %= 0x100;
        cpu.setCarryFlag();
    } else cpu.clearCarryFlag();

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if ((prev_a ^ cpu.a) & ~(prev_a ^ cpu.getByteMemory(memory_address)) & 0x80) cpu.setOverflowFlag();
    else cpu.clearOverflowFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const adc = {
    0x69: (cpu: cpuType) => execAdc(cpu, "immediate"),
    0x65: (cpu: cpuType) => execAdc(cpu, "zero_page"),
    0x75: (cpu: cpuType) => execAdc(cpu, "zero_page_x"),
    0x6d: (cpu: cpuType) => execAdc(cpu, "absolute"),
    0x7d: (cpu: cpuType) => execAdc(cpu, "absolute_x"),
    0x79: (cpu: cpuType) => execAdc(cpu, "absolute_y"),
    0x61: (cpu: cpuType) => execAdc(cpu, "indirect_x"),
    0x71: (cpu: cpuType) => execAdc(cpu, "indirect_y"),
}

export default adc;