import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { addressResolve } from "../../../utils/address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../../../utils/flags";
import { updateMemoryMap } from "../../../utils/memory";

export const execLsr = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    const address = addressResolve(cpu, addressMode, true)
    let content = addressMode == "accumulator" ? cpu.a : cpu.memory[address];

    content & 1 ? setCarryFlag(cpu) : clearCarryFlag(cpu);
    const newContent = content >> 1;

    if (addressMode == "accumulator") {
        cpu.a = newContent;
    } else {
        cpu.memory[address] = newContent;
        updateMemoryMap(cpu, address);
    }

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    newContent >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
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