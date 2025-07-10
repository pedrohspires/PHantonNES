import type { addressModeType, cpuType } from "../../types/cpu.d";

function execAdc(cpu: cpuType, address_mode: addressModeType) {
    let valueToAdc = 0x00;
    const memory_value = cpu.getByteMemory();

    if (address_mode == "immediate")
        valueToAdc = memory_value;

    if (address_mode == "zero_page")
        valueToAdc = cpu.getByteMemory(memory_value);

    if (address_mode == "zero_page_x") {
        valueToAdc = cpu.getByteMemory(memory_value + cpu.x);
        cpu.pc++;
    }

    if (address_mode == "absolute") {
        valueToAdc = cpu.getByteMemory(memory_value + cpu.x);
        cpu.pc++;
    }
}

const adc = {
    0x69: (cpu: cpuType) => execAdc(cpu, "immediate"),
    0x65: (cpu: cpuType) => execAdc(cpu, "zero_page"),
    0x75: (cpu: cpuType) => execAdc(cpu, "zero_page_x"),
    0x6d: (cpu: cpuType) => execAdc(cpu, "absolute"),
    0x7d: (cpu: cpuType) => execAdc(cpu, "absolute_x"),
    0x79: (cpu: cpuType) => execAdc(cpu, "absolute_y"),
    0x61: (cpu: cpuType) => execAdc(cpu, "indirect_x"),
    0x71: (cpu: cpuType) => execAdc(cpu, "indirect_y"),
}

export default adc;