import { useState } from "react";
import { cpuType } from "../types/cpu.d";
import { setCarryFlag, setNegativeFlag, setOverflowFlag, setZeroFlag } from "../utils/bit_operations";
import { decToBin } from "../utils/convertions";

function isOverflow(a: number, add: number) {
    let xorResult = a ^ add;
    let signBit = xorResult & 0x80;
    let overflowFlag = (signBit >> 7) & 0x01;

    return overflowFlag == 1;
}

const op_code_69_exec = (cpu: cpuType) => {
    let content_memory = cpu.memory[cpu.pc];

    if (isOverflow(cpu.a, content_memory))
        cpu.p = setOverflowFlag(cpu.p);

    cpu.a += content_memory;

    if (cpu.a > 0xff) {
        cpu.p = setCarryFlag(cpu.p);
        cpu.a -= 0xff;
    }

    if (cpu.a == 0)
        cpu.p = setZeroFlag(cpu.p);

    if (decToBin(cpu.a)[0] === '1') {
        cpu.p = setNegativeFlag(cpu.p);
    }
}

const instructions = {
    "69": op_code_69_exec
}

export function useCpu(): [cpu: cpuType, get_exec: (code: "69") => typeof instructions[code]] {
    const [cpu] = useState<cpuType>({
        memory: new Array(0xffff),
        x: 0x00,
        y: 0x00,
        a: 0x00,
        sp: 0x00,
        pc: 0x0000,
        p: "00000000" // CZIDB VN
    })

    const get_op_exec = (code: "69") => {
        return instructions[code];
    }

    return [cpu, get_op_exec];
}