import type { cpuType } from "../../types/cpu.d";

function execTya(cpu: cpuType) {
    cpu.clk += 2;
    cpu.a = cpu.y;

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const tya = {
    0x98: (cpu: cpuType) => execTya(cpu),
}

export default tya;