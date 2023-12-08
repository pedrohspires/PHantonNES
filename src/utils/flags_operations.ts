// Flag: C
export function setCarryFlag(flags: string) {
    return flags.substring(0, 0) + '1' + flags.substring(1);
}

export function clearCarryFlag(flags: string) {
    return flags.substring(0, 0) + '0' + flags.substring(1);
}

// Flag: Z
export function setZeroFlag(flags: string) {
    return flags.substring(0, 1) + '1' + flags.substring(2);
}

export function clearZeroFlag(flags: string) {
    return flags.substring(0, 1) + '0' + flags.substring(2);
}

// Flag: I
export function setInterruptFlag(flags: string) {
    return flags.substring(0, 2) + '1' + flags.substring(3);
}

export function clearInterruptFlag(flags: string) {
    return flags.substring(0, 2) + '0' + flags.substring(3);
}

// Flag: D
export function setDecimalFlag(flags: string) {
    return flags.substring(0, 3) + '1' + flags.substring(4);
}

export function clearDecimalFlag(flags: string) {
    return flags.substring(0, 3) + '0' + flags.substring(4);
}

// Flag: B
export function setBreakFlag(flags: string) {
    return flags.substring(0, 4) + '1' + flags.substring(5);
}

export function clearBreakFlag(flags: string) {
    return flags.substring(0, 4) + '0' + flags.substring(5);
}

// Flag: V
export function setOverflowFlag(flags: string) {
    return flags.substring(0, 6) + '1' + flags.substring(7);
}

export function clearOverflowFlag(flags: string) {
    return flags.substring(0, 6) + '0' + flags.substring(7);
}

// Flag: N
export function setNegativeFlag(flags: string) {
    return flags.substring(0, 7) + '1' + flags.substring(8);
}

export function clearNegativeFlag(flags: string) {
    return flags.substring(0, 7) + '0' + flags.substring(8);
}