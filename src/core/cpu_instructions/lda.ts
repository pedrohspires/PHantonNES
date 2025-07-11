import type { addressModeType, cpuType } from "../../types/cpu.d";

function execLda(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    cpu.a = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const lda = {
    0xa9: (cpu: cpuType) => execLda(cpu, "immediate"),
    0xa5: (cpu: cpuType) => execLda(cpu, "zero_page"),
    0xb5: (cpu: cpuType) => execLda(cpu, "zero_page_x"),
    0xad: (cpu: cpuType) => execLda(cpu, "absolute"),
    0xbd: (cpu: cpuType) => execLda(cpu, "absolute_x"),
    0xb9: (cpu: cpuType) => execLda(cpu, "absolute_y"),
    0xa1: (cpu: cpuType) => execLda(cpu, "indirect_x"),
    0xb1: (cpu: cpuType) => execLda(cpu, "indirect_y"),
}

export default lda;