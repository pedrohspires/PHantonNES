import type { addressModeType, cpuType } from "../../types/cpu.d";

function execBit(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    const result = memory_address & cpu.a;

    if (result == 0) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (result & 0b01000000) cpu.setOverflowFlag();
    else cpu.clearOverflowFlag();

    if (result & 0b10000000) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const bit = {
    0x24: (cpu: cpuType) => execBit(cpu, "zero_page"),
    0x2c: (cpu: cpuType) => execBit(cpu, "absolute"),
}

export default bit;