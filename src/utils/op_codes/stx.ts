import { cpuType } from "../../types/cpu.d";
import { adc } from "../instructions/adc";

export const op_code_86_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_96_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page_y");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_8e_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}