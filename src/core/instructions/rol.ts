import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { formatNumber } from "../../utils/format";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../flags";
import { updateMemoryMap } from "../memory";

export const execRol = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    const address = addressResolve(cpu, addressMode, true)
    let content = addressMode == "accumulator" ? cpu.a : cpu.memory[address];

    let oldCarry = cpu.p[0];
    content >> 7 ? setCarryFlag(cpu) : clearCarryFlag(cpu);

    content = content << 1;
    content = Number("0b" + formatNumber(content, 8, 2).slice(0, 8) + oldCarry);

    if (addressMode == "accumulator") {
        cpu.a = content;
    } else {
        cpu.memory[address] = content;
        updateMemoryMap(cpu, address);
    }

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    content >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "accumulator": pcToAdd = 1; clocksToAdd = 2; break;
        case "zero_page": pcToAdd = 2; clocksToAdd = 5; break;
        case "zero_page_x": pcToAdd = 2; clocksToAdd = 6; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 6; break;
        case "absolute_x": pcToAdd = 3; clocksToAdd = 7; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}