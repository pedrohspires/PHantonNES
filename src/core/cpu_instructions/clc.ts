import type { cpuType } from "../../types/cpu.d";

function execClc(cpu: cpuType) {
    cpu.clk += 2;
    cpu.clearCarryFlag();
}

const clc = {
    0x18: (cpu: cpuType) => execClc(cpu),
}

export default clc;