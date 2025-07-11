import type { cpuType } from "../../types/cpu.d";

function execRti(cpu: cpuType) {
    cpu.clk += 6;
    cpu.p = cpu.pullStack();

    const lsb = cpu.pullStack();
    const msb = cpu.pullStack();

    cpu.pc = msb << 8 | lsb;
}

const rti = {
    0x40: (cpu: cpuType) => execRti(cpu),
}

export default rti;