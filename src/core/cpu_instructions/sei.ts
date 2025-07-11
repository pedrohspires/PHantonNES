import type { cpuType } from "../../types/cpu.d";

function execSei(cpu: cpuType) {
    cpu.clk += 2;
    cpu.setInterruptFlag();
}

const sei = {
    0x78: (cpu: cpuType) => execSei(cpu),
}

export default sei;