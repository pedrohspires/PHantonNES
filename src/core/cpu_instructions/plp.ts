import type { cpuType } from "../../types/cpu.d";

function execPlp(cpu: cpuType) {
    cpu.clk += 4;
    cpu.p = cpu.pullStack();
}

const plp = {
    0x28: (cpu: cpuType) => execPlp(cpu),
}

export default plp;