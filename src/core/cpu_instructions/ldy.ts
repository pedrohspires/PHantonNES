import type { addressModeType, cpuType } from "../../types/cpu.d";

function execLdy(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.y = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (cpu.y == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.y >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const ldy = {
    0xa0: (cpu: cpuType) => execLdy(cpu, "immediate"),
    0xa4: (cpu: cpuType) => execLdy(cpu, "zero_page"),
    0xb4: (cpu: cpuType) => execLdy(cpu, "zero_page_x"),
    0xac: (cpu: cpuType) => execLdy(cpu, "absolute"),
    0xbc: (cpu: cpuType) => execLdy(cpu, "absolute_x"),
}

export default ldy;