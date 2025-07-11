import type { cpuType } from "../../types/cpu.d";

function execDey(cpu: cpuType) {
    cpu.clk += 2;
    cpu.y--;

    if (cpu.y == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.y >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const dey = {
    0x88: (cpu: cpuType) => execDey(cpu),
}

export default dey;