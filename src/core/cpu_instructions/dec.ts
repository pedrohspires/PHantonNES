import type { addressModeType, cpuType } from "../../types/cpu.d";

function execDec(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);
    const memory_value = cpu.getByteMemory(memory_address);
    const new_memory_value = memory_value - 1 < 0 ? memory_value - 1 + 0x100 : memory_value - 1;

    cpu.setByteMemory(
        memory_address,
        memory_address == 0x2002 ? new_memory_value & 0b01111111 : new_memory_value
    )

    if (new_memory_value == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (new_memory_value >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();

    cpu.clk += address_mode == "absolute_x" ? 3 : 2;
}

const dec = {
    0xc6: (cpu: cpuType) => execDec(cpu, "zero_page"),
    0xd6: (cpu: cpuType) => execDec(cpu, "zero_page_x"),
    0xce: (cpu: cpuType) => execDec(cpu, "absolute"),
    0xde: (cpu: cpuType) => execDec(cpu, "absolute_x"),
}

export default dec;