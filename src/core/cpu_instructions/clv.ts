import type { cpuType } from "../../types/cpu.d";

function execClv(cpu: cpuType) {
    cpu.clk += 2;
    cpu.clearOverflowFlag();
}

const clv = {
    0xb8: (cpu: cpuType) => execClv(cpu),
}

export default clv;