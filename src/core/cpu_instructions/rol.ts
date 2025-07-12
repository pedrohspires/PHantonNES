import type { addressModeType, cpuType } from "../../types/cpu.d";

function execRol(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);

    if (address_mode == "accumulator") {
        if (cpu.a >> 7) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        cpu.a = ((cpu.a << 1) % 0x100) | (cpu.p & 0b00000001);

        if (cpu.a >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }
    else {
        cpu.clk += address_mode == "absolute_x" ? 3 : 2;

        const memory_value = cpu.getByteMemory(memory_address);
        const new_memory_value = ((memory_value << 1) % 0x100) | (cpu.p & 0b00000001);

        cpu.setByteMemory(
            memory_address,
            memory_address == 0x2002 ? new_memory_value & 0b01111111 : new_memory_value
        )

        if (memory_value >> 7) cpu.setCarryFlag();
        else cpu.clearCarryFlag();

        if (new_memory_value >> 7) cpu.setNegativeFlag();
        else cpu.clearNegativeFlag();
    }

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();
}

const rol = {
    0x2a: (cpu: cpuType) => execRol(cpu, "accumulator"),
    0x26: (cpu: cpuType) => execRol(cpu, "zero_page"),
    0x36: (cpu: cpuType) => execRol(cpu, "zero_page_x"),
    0x2e: (cpu: cpuType) => execRol(cpu, "absolute"),
    0x3e: (cpu: cpuType) => execRol(cpu, "absolute_x"),
}

export default rol;