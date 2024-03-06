import { cpuType } from "../../types/cpu.d";
import { readFirstArgument } from "../../utils/address";
import { formatNumber } from "../../utils/format";

export const execBpl = (cpu: cpuType): void => {
    exec(cpu);
    cpu.pc += 2;
}

const exec = (cpu: cpuType) => {
    let negative = Number(cpu.p[7]);

    if (!negative) {
        let oldPc = cpu.pc;
        cpu.pc += readFirstArgument(cpu);
        cpu.clock += (formatNumber(oldPc).substring(0, 2) != formatNumber(cpu.pc).substring(0, 2) ? 5 : 3); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }
}