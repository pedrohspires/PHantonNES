import { cpuType } from "../../types/cpu.d";
import { adc } from "../instructions/adc";

export const op_code_85_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_95_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_8d_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_9d_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute_x");

    cpu.cycle += 5;
    return cpu;
}

export const op_code_99_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute_y");

    cpu.cycle += 5;
    return cpu;
}

export const op_code_81_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "indirect_x");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_91_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "indirect_y");

    cpu.cycle += 6;
    return cpu;
}