import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { addressResolve } from "../../../utils/address";

export const execJmp = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let address_to_jmp = addressResolve(cpu, addressMode, true);

    cpu.pc = address_to_jmp;
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    // let pcToAdd = 0;

    // switch (addressMode) {
    //     case "absolute": pcToAdd = 3; clocksToAdd = 3; break;
    //     case "indirect": pcToAdd = 3; clocksToAdd = 5; break;
    // }

    switch (addressMode) {
        case "absolute": clocksToAdd = 3; break;
        case "indirect": clocksToAdd = 5; break;
    }

    cpu.clock += clocksToAdd;
    // cpu.pc += pcToAdd;
}