import type { cpuType } from "../../types/cpu.d";

function execPla(cpu: cpuType) {
    cpu.clk += 4;
    cpu.a = cpu.pullStack();
}

const pla = {
    0x68: (cpu: cpuType) => execPla(cpu),
}

export default pla;