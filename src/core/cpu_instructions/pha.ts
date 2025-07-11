import type { cpuType } from "../../types/cpu.d";

function execPha(cpu: cpuType) {
    cpu.clk += 3;
    cpu.pushStack(cpu.a);
}

const pha = {
    0x48: (cpu: cpuType) => execPha(cpu),
}

export default pha;