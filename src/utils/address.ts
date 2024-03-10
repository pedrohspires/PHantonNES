import { cpuType } from "../types/cpu.d";
import { formatNumber } from "./format";

export const getCombinedAddress = (LSB: number, MSB: number) => {
    return Number("0x" + formatNumber(MSB, 2) + formatNumber(LSB, 2))
};

export const readFirstArgument = (cpu: cpuType) => {
    return cpu.memory[cpu.pc + 1];
}

export const readSecondArgument = (cpu: cpuType) => {
    return cpu.memory[cpu.pc + 2];
}

export const getNumberFromSignedByte = (byte: number) => {
    if ((byte >> 7) === 0) {
        return byte;
    } else {
        return 0 - byte & 0x7F;
    }
}