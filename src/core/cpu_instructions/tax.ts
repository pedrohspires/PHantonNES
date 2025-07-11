import type { cpuType } from "../../types/cpu.d";

function execTax(cpu: cpuType) {
    cpu.clk += 2;
    cpu.x = cpu.a;

    if (cpu.x == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.x >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const tax = {
    0xaa: (cpu: cpuType) => execTax(cpu),
}

export default tax;