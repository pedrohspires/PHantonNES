import { InstructionType } from "../types/instruction.d"
import { execAdc } from "./instructions/adc"
import { execAnd } from "./instructions/and"
import { execAsl } from "./instructions/asl"

export const instructions: InstructionType = {
    // ADC
    0x69: (cpu) => execAdc(cpu, "immediate"),
    0x65: (cpu) => execAdc(cpu, "zero_page"),
    0x75: (cpu) => execAdc(cpu, "zero_page_x"),
    0x6d: (cpu) => execAdc(cpu, "absolute"),
    0x7d: (cpu) => execAdc(cpu, "absolute_x"),
    0x79: (cpu) => execAdc(cpu, "absolute_y"),
    0x61: (cpu) => execAdc(cpu, "indirect_x"),
    0x71: (cpu) => execAdc(cpu, "indirect_y"),

    // AND
    0x29: (cpu) => execAnd(cpu, "immediate"),
    0x25: (cpu) => execAnd(cpu, "zero_page"),
    0x35: (cpu) => execAnd(cpu, "zero_page_x"),
    0x2d: (cpu) => execAnd(cpu, "absolute"),
    0x3d: (cpu) => execAnd(cpu, "absolute_x"),
    0x39: (cpu) => execAnd(cpu, "absolute_y"),
    0x21: (cpu) => execAnd(cpu, "indirect_x"),
    0x31: (cpu) => execAnd(cpu, "indirect_y"),

    // ASL
    0x0a: (cpu) => execAsl(cpu, "accumulator"),
    0x06: (cpu) => execAsl(cpu, "zero_page"),
    0x16: (cpu) => execAsl(cpu, "zero_page_x"),
    0x0e: (cpu) => execAsl(cpu, "absolute"),
    0x1e: (cpu) => execAsl(cpu, "absolute_x"),
}