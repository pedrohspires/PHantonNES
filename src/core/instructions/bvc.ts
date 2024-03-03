import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";

export const execBvc = (cpu: cpuType): void => {
    exec(cpu);
}

const exec = (cpu: cpuType) => {
    let overflow = Number(cpu.p[6]);

    if (!overflow) {
        let oldPc = cpu.pc;

        cpu.pc += cpu.memory[cpu.pc + 1];
        cpu.clock += (formatNumber(oldPc).substring(0, 2) != formatNumber(cpu.pc).substring(0, 2) ? 5 : 3); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }
}