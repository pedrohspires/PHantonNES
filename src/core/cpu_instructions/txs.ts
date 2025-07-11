import type { cpuType } from "../../types/cpu.d";

function execTxs(cpu: cpuType) {
    cpu.clk += 2;
    cpu.sp = cpu.x;
}

const txs = {
    0x9a: (cpu: cpuType) => execTxs(cpu),
}

export default txs;