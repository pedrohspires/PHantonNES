import type { cpuType } from "../../types/cpu.d";

function execPhp(cpu: cpuType) {
    cpu.clk += 3;
    cpu.pushStack(cpu.p);
}

const php = {
    0x08: (cpu: cpuType) => execPhp(cpu),
}

export default php;