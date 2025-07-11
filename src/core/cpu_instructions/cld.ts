import type { cpuType } from "../../types/cpu.d";

function execCld(cpu: cpuType) {
    cpu.clk += 2;
    cpu.clearDecimalFlag();
}

const cld = {
    0xd8: (cpu: cpuType) => execCld(cpu),
}

export default cld;