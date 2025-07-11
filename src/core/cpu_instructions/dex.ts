import type { cpuType } from "../../types/cpu.d";

function execDex(cpu: cpuType) {
    cpu.clk += 2;
    cpu.x--;

    if (cpu.x == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.x >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const dex = {
    0xca: (cpu: cpuType) => execDex(cpu),
}

export default dex;