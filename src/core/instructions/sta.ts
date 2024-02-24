import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";

export const execSta = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let address = cpu.memory[addressResolve(cpu, addressMode)];

    cpu.memory[address] = cpu.a;
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "zero_page": pcToAdd = 2; clocksToAdd = 3; break;
        case "zero_page_x": pcToAdd = 2; clocksToAdd = 4; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 4; break;
        case "absolute_x": pcToAdd = 3; clocksToAdd = 5; break;
        case "absolute_y": pcToAdd = 3; clocksToAdd = 5; break;
        case "indirect_x": pcToAdd = 2; clocksToAdd = 6; break;
        case "indirect_y": pcToAdd = 2; clocksToAdd = 6; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}