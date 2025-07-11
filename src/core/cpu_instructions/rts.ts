import type { cpuType } from "../../types/cpu.d";

function execRts(cpu: cpuType) {
    cpu.clk += 6;
    cpu.p = cpu.pullStack();

    const lsb = cpu.pullStack();
    const msb = cpu.pullStack();

    cpu.pc = (msb << 8 | lsb) + 1;
}

const rts = {
    0x60: (cpu: cpuType) => execRts(cpu),
}

export default rts;