import type { addressModeType, cpuType } from "../../types/cpu.d";

function execEor(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.a ^= address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const eor = {
    0x49: (cpu: cpuType) => execEor(cpu, "immediate"),
    0x45: (cpu: cpuType) => execEor(cpu, "zero_page"),
    0x55: (cpu: cpuType) => execEor(cpu, "zero_page_x"),
    0x4d: (cpu: cpuType) => execEor(cpu, "absolute"),
    0x5d: (cpu: cpuType) => execEor(cpu, "absolute_x"),
    0x59: (cpu: cpuType) => execEor(cpu, "absolute_y"),
    0x41: (cpu: cpuType) => execEor(cpu, "indirect_x"),
    0x51: (cpu: cpuType) => execEor(cpu, "indirect_y"),
}

export default eor;