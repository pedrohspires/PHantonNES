import { cpuType } from "../../types/cpu.d";
import { ldx } from "../instructions/ldx";

export const op_code_a2_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldx(cpu, arg, "immediate");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_a6_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldx(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_b6_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldx(cpu, arg, "zero_page_y");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_ae_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldx(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_be_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldx(cpu, arg, "absolute_y");

    cpu.cycle += 4;
    return cpu;
}