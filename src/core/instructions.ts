import { InstructionType } from "../types/instruction.d"
import { execAdc } from "./instructions/adc"
import { execAnd } from "./instructions/and"
import { execAsl } from "./instructions/asl"
import { execBcc } from "./instructions/bcc"
import { execBcs } from "./instructions/bcs"
import { execBeq } from "./instructions/beq"
import { execBit } from "./instructions/bit"
import { execBmi } from "./instructions/bmi"
import { execBne } from "./instructions/bne"
import { execBrk } from "./instructions/brk"
import { execBvc } from "./instructions/bvc"
import { execBvs } from "./instructions/bvs"
import { execClc } from "./instructions/clc"
import { execCld } from "./instructions/cld"
import { execCli } from "./instructions/cli"
import { execClv } from "./instructions/clv"
import { execCmp } from "./instructions/cmp"

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

    // BCC
    0x90: (cpu) => execBcc(cpu),

    // BCS
    0xb0: (cpu) => execBcs(cpu),

    // BEQ
    0xf0: (cpu) => execBeq(cpu),

    // BIT
    0x24: (cpu) => execBit(cpu, "zero_page"),
    0x2c: (cpu) => execBit(cpu, "absolute"),

    // BMI
    0x30: (cpu) => execBmi(cpu),

    // BNE
    0xd0: (cpu) => execBne(cpu),

    // BPL
    0x10: (cpu) => execBne(cpu),

    // BRK
    0x00: (cpu) => execBrk(cpu),

    // BVC
    0x50: (cpu) => execBvc(cpu),

    // BVS
    0x70: (cpu) => execBvs(cpu),

    // CLC
    0x18: (cpu) => execClc(cpu),

    // CLD
    0xd8: (cpu) => execCld(cpu),

    // CLI
    0x58: (cpu) => execCli(cpu),

    // CLV
    0xb8: (cpu) => execClv(cpu),

    // CMP
    0xc9: (cpu) => execCmp(cpu, "immediate"),
    0xc5: (cpu) => execCmp(cpu, "zero_page"),
    0xd5: (cpu) => execCmp(cpu, "zero_page_x"),
    0xcd: (cpu) => execCmp(cpu, "absolute"),
    0xdd: (cpu) => execCmp(cpu, "absolute_x"),
    0xd9: (cpu) => execCmp(cpu, "absolute_y"),
    0xc1: (cpu) => execCmp(cpu, "indirect_x"),
    0xd1: (cpu) => execCmp(cpu, "indirect_y"),
}