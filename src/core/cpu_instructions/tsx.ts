import type { cpuType } from "../../types/cpu.d";

function execTsx(cpu: cpuType) {
    cpu.clk += 2;
    cpu.x = cpu.sp;

    if (cpu.x == 0x00) cpu.setZeroFlag();
    else cpu.clearZeroFlag();

    if (cpu.x >> 7) cpu.setNegativeFlag();
    else cpu.clearNegativeFlag();
}

const tsx = {
    0xba: (cpu: cpuType) => execTsx(cpu),
}

export default tsx;