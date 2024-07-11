import { cpuType } from "../../../types/cpu.d";
import { getNumberFromSignedByte, readFirstArgument } from "../../../utils/address";
import { formatNumber } from "../../../utils/format";

export const execBpl = (cpu: cpuType): void => {
    exec(cpu);
}

const exec = (cpu: cpuType) => {
    let negative = Number(cpu.p[7]);

    if (!negative) {
        let oldPc = cpu.pc;
        console.log(readFirstArgument(cpu).toString(16))
        console.log(getNumberFromSignedByte(readFirstArgument(cpu)).toString(16))
        cpu.pc += getNumberFromSignedByte(readFirstArgument(cpu));
        cpu.clock += (formatNumber(oldPc).substring(0, 2) != formatNumber(cpu.pc).substring(0, 2) ? 3 : 1); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }

    cpu.clock += 2;
    cpu.pc += 2;
}