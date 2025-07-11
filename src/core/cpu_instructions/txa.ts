import type { cpuType } from "../../types/cpu.d";

function execTxa(cpu: cpuType) {
    cpu.clk += 2;
    cpu.a = cpu.x;

    if (cpu.a == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.a >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const txa = {
    0x8a: (cpu: cpuType) => execTxa(cpu),
}

export default txa;