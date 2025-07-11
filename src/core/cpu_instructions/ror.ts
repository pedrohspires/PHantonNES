import type { addressModeType, cpuType } from "../../types/cpu.d";

function execRor(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);

    if (address_mode == "accumulator") {
        if (cpu.a & 0b00000001) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        cpu.a = (cpu.a >> 1) | (cpu.p & 0b10000000);

        if (cpu.a >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }
    else {
        cpu.clk += address_mode == "absolute_x" ? 3 : 2;

        const memory_value = cpu.getByteMemory(memory_address);
        const new_memory_value = (memory_value >> 1) | (cpu.p & 0b10000000);
        cpu.setByteMemory(memory_address, new_memory_value);

        if (memory_value & 0b00000001) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        if (new_memory_value >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();
}

const ro4 = {
    0x6a: (cpu: cpuType) => execRor(cpu, "accumulator"),
    0x66: (cpu: cpuType) => execRor(cpu, "zero_page"),
    0x76: (cpu: cpuType) => execRor(cpu, "zero_page_x"),
    0x6e: (cpu: cpuType) => execRor(cpu, "absolute"),
    0x7e: (cpu: cpuType) => execRor(cpu, "absolute_x"),
}

export default ro4;