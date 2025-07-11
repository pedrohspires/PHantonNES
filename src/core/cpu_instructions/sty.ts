import type { addressModeType, cpuType } from "../../types/cpu.d";

function execSty(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);
    cpu.setByteMemory(memory_address, cpu.y);
}

const sty = {
    0x84: (cpu: cpuType) => execSty(cpu, "zero_page"),
    0x94: (cpu: cpuType) => execSty(cpu, "zero_page_x"),
    0x8c: (cpu: cpuType) => execSty(cpu, "absolute"),
}

export default sty;