import type { addressModeType, cpuType } from "../../types/cpu.d";

function execLsr(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);

    if (address_mode == "accumulator") {
        if (cpu.a & 0b00000001) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        cpu.a = cpu.a >> 1;

        if (cpu.a >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }
    else {
        cpu.clk += address_mode == "absolute_x" ? 3 : 2;

        const memory_value = cpu.getByteMemory(memory_address);
        const new_memory_value = memory_value >> 1;
        cpu.setByteMemory(memory_address, new_memory_value);

        if (memory_value & 0b00000001) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        if (new_memory_value >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();
}

const lsr = {
    0x4a: (cpu: cpuType) => execLsr(cpu, "accumulator"),
    0x46: (cpu: cpuType) => execLsr(cpu, "zero_page"),
    0x56: (cpu: cpuType) => execLsr(cpu, "zero_page_x"),
    0x4e: (cpu: cpuType) => execLsr(cpu, "absolute"),
    0x5e: (cpu: cpuType) => execLsr(cpu, "absolute_x"),
}

export default lsr;