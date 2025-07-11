import type { cpuType } from "../../types/cpu.d";

function execNop(cpu: cpuType) {
    cpu.clk += 2;
}

const nop = {
    0xea: (cpu: cpuType) => execNop(cpu),
}

export default nop;