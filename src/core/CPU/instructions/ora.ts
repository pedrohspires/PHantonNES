import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { addressResolve } from "../../../utils/address";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../../../utils/flags";

export const execOra = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_ora = cpu.memory[addressResolve(cpu, addressMode)];
    cpu.a = cpu.a | content_to_ora;

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.a >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "immediate": pcToAdd = 2; clocksToAdd = 2; break;
        case "zero_page": pcToAdd = 2; clocksToAdd = 3; break;
        case "zero_page_x": pcToAdd = 2; clocksToAdd = 4; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 4; break;
        case "absolute_x": pcToAdd = 3; clocksToAdd = 4; break;
        case "absolute_y": pcToAdd = 3; clocksToAdd = 4; break;
        case "indirect_x": pcToAdd = 2; clocksToAdd = 6; break;
        case "indirect_y": pcToAdd = 2; clocksToAdd = 5; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}