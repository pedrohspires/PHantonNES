import type { addressModeType, cpuType } from "../../types/cpu.d";

function execLdx(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.x = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (memory_address == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    if (cpu.x == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.x >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const ldx = {
    0xa2: (cpu: cpuType) => execLdx(cpu, "immediate"),
    0xa6: (cpu: cpuType) => execLdx(cpu, "zero_page"),
    0xb6: (cpu: cpuType) => execLdx(cpu, "zero_page_y"),
    0xae: (cpu: cpuType) => execLdx(cpu, "absolute"),
    0xbe: (cpu: cpuType) => execLdx(cpu, "absolute_y"),
}

export default ldx;