import type { addressModeType, cpuType } from "../../types/cpu.d";

function execCpx(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode);
    const memory_value = address_mode == "immediate"
        ? memory_address
        : cpu.getByteMemory(memory_address);

    if (memory_address == 0x2002) cpu.memory[0x2002] &= 0b01111111;

    if (cpu.x >= memory_value) cpu.setCarryFlag();
    else cpu.clearCarryFlag();

    if (cpu.x == memory_value) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if ((cpu.x - memory_value) >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const cpx = {
    0xe0: (cpu: cpuType) => execCpx(cpu, "immediate"),
    0xe4: (cpu: cpuType) => execCpx(cpu, "zero_page"),
    0xec: (cpu: cpuType) => execCpx(cpu, "absolute"),
}

export default cpx;