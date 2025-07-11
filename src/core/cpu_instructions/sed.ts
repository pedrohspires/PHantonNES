import type { cpuType } from "../../types/cpu.d";

function execSed(cpu: cpuType) {
    cpu.clk += 2;
    cpu.setDecimalFlag();
}

const sed = {
    0xf8: (cpu: cpuType) => execSed(cpu),
}

export default sed;