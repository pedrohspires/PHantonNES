import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";

export const execSty = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let address = cpu.memory[addressResolve(cpu, addressMode)];

    cpu.memory[address] = cpu.y;
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "zero_page": pcToAdd = 2; clocksToAdd = 3; break;
        case "zero_page_x": pcToAdd = 2; clocksToAdd = 4; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 4; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}