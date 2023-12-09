import { cpuType } from "../../types/cpu.d";
import { adc } from "../instructions/adc";

export const op_code_84_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_94_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_8c_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}