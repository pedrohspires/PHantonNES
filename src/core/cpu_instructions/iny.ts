import type { cpuType } from "../../types/cpu.d";

function execIny(cpu: cpuType) {
    cpu.clk += 2;
    cpu.y++;

    if (cpu.y == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.y >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const iny = {
    0xc8: (cpu: cpuType) => execIny(cpu),
}

export default iny;