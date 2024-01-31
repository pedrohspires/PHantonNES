import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../flags";
import { updateMemoryMap } from "../memory";

export const execAsl = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    const address = addressResolve(cpu, addressMode, true)
    let content = addressMode == "accumulator" ? cpu.a : cpu.memory[address];

    content >> 7 ? setCarryFlag(cpu) : clearCarryFlag(cpu);
    const newContent = content << 1;

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
        case "accumulator": clocksToAdd = 2; pcToAdd = 1; break;
        case "zero_page": clocksToAdd = 5; pcToAdd = 2; break;
        case "zero_page_x": clocksToAdd = 6; pcToAdd = 2; break;
        case "absolute": clocksToAdd = 6; pcToAdd = 3; break;
        case "absolute_x": clocksToAdd = 7; pcToAdd = 3; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}