import type { cpuType } from "../../types/cpu.d";

function execCli(cpu: cpuType) {
    cpu.clk += 2;
    cpu.clearInterruptFlag();
}

const cli = {
    0x58: (cpu: cpuType) => execCli(cpu),
}

export default cli;