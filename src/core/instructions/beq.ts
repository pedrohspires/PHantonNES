import { cpuType } from "../../types/cpu.d";
import { getNumberFromSignedByte, readFirstArgument } from "../../utils/address";
import { formatNumber } from "../../utils/format";

export const execBeq = (cpu: cpuType): void => {
    exec(cpu);
}

const exec = (cpu: cpuType) => {
    let zero = Number(cpu.p[1]);

    if (zero) {
        let oldPc = cpu.pc;
        cpu.pc += getNumberFromSignedByte(readFirstArgument(cpu));
        cpu.pc += 2;
        cpu.clock += (formatNumber(oldPc).substring(0, 2) != formatNumber(cpu.pc).substring(0, 2) ? 5 : 3); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }
}