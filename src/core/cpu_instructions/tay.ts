import type { cpuType } from "../../types/cpu.d";

function execTay(cpu: cpuType) {
    cpu.clk += 2;
    cpu.y = cpu.a;

    if (cpu.y == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.y >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const tay = {
    0xa8: (cpu: cpuType) => execTay(cpu),
}

export default tay;