import { InstructionType } from "../types/instruction.d"
import { execAdc } from "./instructions/add"

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
}