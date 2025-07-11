import type { cpuType } from "../../types/cpu.d";

function execSec(cpu: cpuType) {
    cpu.clk += 2;
    cpu.setCarryFlag();
}

const sec = {
    0x38: (cpu: cpuType) => execSec(cpu),
}

export default sec;