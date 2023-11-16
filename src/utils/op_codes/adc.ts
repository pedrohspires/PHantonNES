import { cpuType } from "../../types/cpu.d";
import { adc } from "../instructions/adc";

export const op_code_69_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "immediate");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_65_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_75_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_6D_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_7D_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_79_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "absolute_y");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_61_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "indirect_x");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_71_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = adc(cpu, arg, "indirect_y");

    cpu.cycle += 5;
    return cpu;
}