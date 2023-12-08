import { cpuType } from "../../types/cpu.d";
import { and } from "../instructions/and";

export const op_code_29_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "immediate");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_25_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_35_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_2d_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_3d_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "absolute_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_39_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "absolute_y");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_21_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "indirect_x");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_31_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = and(cpu, arg, "indirect_y");

    cpu.cycle += 5;
    return cpu;
}