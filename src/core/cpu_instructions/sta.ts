import type { addressModeType, cpuType } from "../../types/cpu.d";

function execSta(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);
    cpu.setByteMemory(memory_address, cpu.a);

    if (address_mode == "absolute_x" || address_mode == "absolute_y" || address_mode == "indirect_y")
        cpu.clk++;
}

const sta = {
    0x85: (cpu: cpuType) => execSta(cpu, "zero_page"),
    0x95: (cpu: cpuType) => execSta(cpu, "zero_page_x"),
    0x8d: (cpu: cpuType) => execSta(cpu, "absolute"),
    0x9d: (cpu: cpuType) => execSta(cpu, "absolute_x"),
    0x99: (cpu: cpuType) => execSta(cpu, "absolute_y"),
    0x81: (cpu: cpuType) => execSta(cpu, "indirect_x"),
    0x91: (cpu: cpuType) => execSta(cpu, "indirect_y"),
}

export default sta;