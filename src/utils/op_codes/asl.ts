import { cpuType } from "../../types/cpu.d";
import { asl } from "../instructions/asl";

export const op_code_0a_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = asl(cpu, arg, "accumulator");

    cpu.cycle += 2;
    return cpu;
}

export const op_code_06_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = asl(cpu, arg, "zero_page");

    cpu.cycle += 5;
    return cpu;
}

export const op_code_16_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = asl(cpu, arg, "zero_page_x");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_0e_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = asl(cpu, arg, "absolute");

    cpu.cycle += 6;
    return cpu;
}

export const op_code_1e_exec = (cpu: cpuType, arg: number): cpuType => {
    cpu = asl(cpu, arg, "absolute_x");

    cpu.cycle += 7;
    return cpu;
}