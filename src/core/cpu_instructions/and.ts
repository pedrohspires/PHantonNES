import type { addressModeType, cpuType } from "../../types/cpu.d";

function execAnd(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.a &= address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const and = {
    0x29: (cpu: cpuType) => execAnd(cpu, "immediate"),
    0x25: (cpu: cpuType) => execAnd(cpu, "zero_page"),
    0x35: (cpu: cpuType) => execAnd(cpu, "zero_page_x"),
    0x2d: (cpu: cpuType) => execAnd(cpu, "absolute"),
    0x3d: (cpu: cpuType) => execAnd(cpu, "absolute_x"),
    0x39: (cpu: cpuType) => execAnd(cpu, "absolute_y"),
    0x21: (cpu: cpuType) => execAnd(cpu, "indirect_x"),
    0x31: (cpu: cpuType) => execAnd(cpu, "indirect_y"),
}

export default and;