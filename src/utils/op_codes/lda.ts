import { cpuType } from "../../types/cpu.d";
import { lda } from "../instructions/lda";

export const op_code_a9_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "immediate");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_a5_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_b5_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_ad_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_bd_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "absolute_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_b9_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "absolute_y");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_a1_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "indirect_x");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_b1_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = lda(cpu, arg, "indirect_y");

    cpu.cycle += 5;
    return cpu;
}