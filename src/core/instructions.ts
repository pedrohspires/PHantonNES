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
import { execCpx } from "./instructions/cpx"
import { execCpy } from "./instructions/cpy"
import { execDec } from "./instructions/dec"
import { execDex } from "./instructions/dex"
import { execDey } from "./instructions/dey"
import { execEor } from "./instructions/eor"
import { execInc } from "./instructions/inc"
import { execInx } from "./instructions/inx"
import { execIny } from "./instructions/iny"
import { execJmp } from "./instructions/jmp"
import { execJsr } from "./instructions/jsr"
import { execLda } from "./instructions/lda"
import { execLdx } from "./instructions/ldx"
import { execLdy } from "./instructions/ldy"
import { execLsr } from "./instructions/lsr"
import { execNop } from "./instructions/nop"
import { execOra } from "./instructions/ora"
import { execPha } from "./instructions/pha"
import { execPhp } from "./instructions/php"
import { execPla } from "./instructions/pla"
import { execRol } from "./instructions/rol"
import { execRor } from "./instructions/ror"

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

    // CPX
    0xe0: (cpu) => execCpx(cpu, "immediate"),
    0xe4: (cpu) => execCpx(cpu, "zero_page"),
    0xec: (cpu) => execCpx(cpu, "absolute"),

    // CPY
    0xc0: (cpu) => execCpy(cpu, "immediate"),
    0xc4: (cpu) => execCpy(cpu, "zero_page"),
    0xcc: (cpu) => execCpy(cpu, "absolute"),

    // DEC
    0xc6: (cpu) => execDec(cpu, "zero_page"),
    0xd6: (cpu) => execDec(cpu, "zero_page_x"),
    0xce: (cpu) => execDec(cpu, "absolute"),
    0xde: (cpu) => execDec(cpu, "absolute_x"),

    // DEX
    0xca: (cpu) => execDex(cpu),

    // DEY
    0x88: (cpu) => execDey(cpu),

    // EOR
    0x49: (cpu) => execEor(cpu, "immediate"),
    0x45: (cpu) => execEor(cpu, "zero_page"),
    0x55: (cpu) => execEor(cpu, "zero_page_x"),
    0x4d: (cpu) => execEor(cpu, "absolute"),
    0x5d: (cpu) => execEor(cpu, "absolute_x"),
    0x59: (cpu) => execEor(cpu, "absolute_y"),
    0x41: (cpu) => execEor(cpu, "indirect_x"),
    0x51: (cpu) => execEor(cpu, "indirect_y"),

    // INC
    0xe6: (cpu) => execInc(cpu, "zero_page"),
    0xf6: (cpu) => execInc(cpu, "zero_page_x"),
    0xee: (cpu) => execInc(cpu, "absolute"),
    0xfe: (cpu) => execInc(cpu, "absolute_x"),

    // INX
    0xe8: (cpu) => execInx(cpu),

    // INY
    0xc8: (cpu) => execIny(cpu),

    // JMP
    0x4c: (cpu) => execJmp(cpu, "absolute"),
    0x6c: (cpu) => execJmp(cpu, "indirect"),

    // JSR
    0x20: (cpu) => execJsr(cpu),

    // LDA
    0xa9: (cpu) => execLda(cpu, "immediate"),
    0xa5: (cpu) => execLda(cpu, "zero_page"),
    0xb5: (cpu) => execLda(cpu, "zero_page_x"),
    0xad: (cpu) => execLda(cpu, "absolute"),
    0xbd: (cpu) => execLda(cpu, "absolute_x"),
    0xb9: (cpu) => execLda(cpu, "absolute_y"),
    0xa1: (cpu) => execLda(cpu, "indirect_x"),
    0xb1: (cpu) => execLda(cpu, "indirect_y"),

    // LDX
    0xa2: (cpu) => execLdx(cpu, "immediate"),
    0xa6: (cpu) => execLdx(cpu, "zero_page"),
    0xb6: (cpu) => execLdx(cpu, "zero_page_y"),
    0xae: (cpu) => execLdx(cpu, "absolute"),
    0xbe: (cpu) => execLdx(cpu, "absolute_y"),

    // LDY
    0xa0: (cpu) => execLdy(cpu, "immediate"),
    0xa4: (cpu) => execLdy(cpu, "zero_page"),
    0xb4: (cpu) => execLdy(cpu, "zero_page_x"),
    0xac: (cpu) => execLdy(cpu, "absolute"),
    0xbc: (cpu) => execLdy(cpu, "absolute_x"),

    // LSR
    0x4a: (cpu) => execLsr(cpu, "accumulator"),
    0x46: (cpu) => execLsr(cpu, "zero_page"),
    0x56: (cpu) => execLsr(cpu, "zero_page_x"),
    0x4e: (cpu) => execLsr(cpu, "absolute"),
    0x5e: (cpu) => execLsr(cpu, "absolute_x"),

    // NOP
    0xea: (cpu) => execNop(cpu),

    // ORA
    0x09: (cpu) => execOra(cpu, "immediate"),
    0x05: (cpu) => execOra(cpu, "zero_page"),
    0x15: (cpu) => execOra(cpu, "zero_page_x"),
    0x0d: (cpu) => execOra(cpu, "absolute"),
    0x1d: (cpu) => execOra(cpu, "absolute_x"),
    0x19: (cpu) => execOra(cpu, "absolute_y"),
    0x01: (cpu) => execOra(cpu, "indirect_x"),
    0x11: (cpu) => execOra(cpu, "indirect_y"),

    // PHA
    0x48: (cpu) => execPha(cpu),

    // PHP
    0x08: (cpu) => execPhp(cpu),

    // PLA
    0x68: (cpu) => execPla(cpu),

    // ROL
    0x2a: (cpu) => execRol(cpu, "accumulator"),
    0x26: (cpu) => execRol(cpu, "zero_page"),
    0x36: (cpu) => execRol(cpu, "zero_page_x"),
    0x2e: (cpu) => execRol(cpu, "absolute"),
    0x3e: (cpu) => execRol(cpu, "absolute_x"),

    // ROR
    0x6a: (cpu) => execRor(cpu, "accumulator"),
    0x66: (cpu) => execRor(cpu, "zero_page"),
    0x76: (cpu) => execRor(cpu, "zero_page_x"),
    0x6e: (cpu) => execRor(cpu, "absolute"),
    0x7e: (cpu) => execRor(cpu, "absolute_x"),
}