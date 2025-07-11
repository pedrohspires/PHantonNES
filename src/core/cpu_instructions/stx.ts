import type { addressModeType, cpuType } from "../../types/cpu.d";

function execStx(cpu: cpuType, address_mode: addressModeType) {
    const memory_address = cpu.addressModeResolve(address_mode, true);
    cpu.setByteMemory(memory_address, cpu.x);
}

const stx = {
    0x86: (cpu: cpuType) => execStx(cpu, "zero_page"),
    0x96: (cpu: cpuType) => execStx(cpu, "zero_page_y"),
    0x8e: (cpu: cpuType) => execStx(cpu, "absolute"),
}

export default stx;