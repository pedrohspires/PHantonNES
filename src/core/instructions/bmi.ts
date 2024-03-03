import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";

export const execBmi = (cpu: cpuType): void => {
    exec(cpu);
}

const exec = (cpu: cpuType) => {
    let negative = Number(cpu.p[7]);

    if (negative) {
        let oldPc = cpu.pc;

        cpu.pc += cpu.memory[cpu.pc + 1];
        cpu.clock += (formatNumber(oldPc).substring(0, 2) != formatNumber(cpu.pc).substring(0, 2) ? 5 : 3); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }
}