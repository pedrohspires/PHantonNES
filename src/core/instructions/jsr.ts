import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";
import { addressResolve } from "../address";

export const execJsr = (cpu: cpuType): void => {
    exec(cpu);
    cpu.clock += 6;
}

const exec = (cpu: cpuType) => {
    let pcHex = formatNumber(cpu.pc - 1);

    cpu.memory[cpu.sp--] = Number("0x" + pcHex.substring(0, 2));
    cpu.memory[cpu.sp--] = Number("0x" + pcHex.substring(2, 4));

    let address_to_jsr = addressResolve(cpu, "absolute", true);

    cpu.pc = address_to_jsr;
}