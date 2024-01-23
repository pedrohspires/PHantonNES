import { cpuType } from "../types/cpu.d";

// Flag: C
export const setCarryFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 7) + '1' + cpu.p.substring(8);
}

export const clearCarryFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 7) + '0' + cpu.p.substring(8);
}

// Flag: Z
export const setZeroFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 6) + '1' + cpu.p.substring(7);
}

export const clearZeroFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 6) + '0' + cpu.p.substring(7);
}

// Flag: I
export const setInterruptFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 4) + '1' + cpu.p.substring(5);
}

export const clearInterruptFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 4) + '0' + cpu.p.substring(5);
}

// Flag: D
export const setDecimalFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 3) + '1' + cpu.p.substring(4);
}

export const clearDecimalFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 3) + '0' + cpu.p.substring(4);
}

// Flag: B
export const setBreakFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 2) + '1' + cpu.p.substring(3);
}

export const clearBreakFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 2) + '0' + cpu.p.substring(3);
}

// Flag: V
export const setOverflowFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 1) + '1' + cpu.p.substring(2);
}

export const clearOverflowFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 1) + '0' + cpu.p.substring(2);
}

// Flag: N
export const setNegativeFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 0) + '1' + cpu.p.substring(1);
}

export const clearNegativeFlag = (cpu: cpuType) => {
    cpu.p = cpu.p.substring(0, 0) + '0' + cpu.p.substring(1);
}