import type { addressModeType, cpuType } from "../../types/cpu.d";

function execInc(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);
    const memory_value = cpu.getByteMemory(memory_address);
    const new_memory_value = memory_value + 1;

    cpu.setByteMemory(memory_address, new_memory_value)

    if (new_memory_value == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (new_memory_value >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();

    cpu.clk += address_mode == "absolute_x" ? 3 : 2;
}

const inc = {
    0xe6: (cpu: cpuType) => execInc(cpu, "zero_page"),
    0xf6: (cpu: cpuType) => execInc(cpu, "zero_page_x"),
    0xee: (cpu: cpuType) => execInc(cpu, "absolute"),
    0xfe: (cpu: cpuType) => execInc(cpu, "absolute_x"),
}

export default inc;