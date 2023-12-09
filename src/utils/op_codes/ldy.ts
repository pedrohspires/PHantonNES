import { cpuType } from "../../types/cpu.d";
import { ldy } from "../instructions/ldy";

export const op_code_a0_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldy(cpu, arg, "immediate");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_a4_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldy(cpu, arg, "zero_page");

    cpu.cycle += 3;
    return cpu;
}

export const op_code_b4_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldy(cpu, arg, "zero_page_x");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_ac_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldy(cpu, arg, "absolute");

    cpu.cycle += 4;
    return cpu;
}

export const op_code_bc_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = ldy(cpu, arg, "absolute_x");

    cpu.cycle += 4;
    return cpu;
}