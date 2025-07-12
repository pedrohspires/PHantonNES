import type { addressModeType, cpuType } from "../../types/cpu.d";

function execOra(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.a |= address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (memory_address == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const ora = {
    0x09: (cpu: cpuType) => execOra(cpu, "immediate"),
    0x05: (cpu: cpuType) => execOra(cpu, "zero_page"),
    0x15: (cpu: cpuType) => execOra(cpu, "zero_page_x"),
    0x0d: (cpu: cpuType) => execOra(cpu, "absolute"),
    0x1d: (cpu: cpuType) => execOra(cpu, "absolute_x"),
    0x19: (cpu: cpuType) => execOra(cpu, "absolute_y"),
    0x01: (cpu: cpuType) => execOra(cpu, "indirect_x"),
    0x11: (cpu: cpuType) => execOra(cpu, "indirect_y"),
}

export default ora;