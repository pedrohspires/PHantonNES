import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { addressResolve } from "../../../utils/address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../../../utils/flags";

export const execCmp = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_cmp = cpu.memory[addressResolve(cpu, addressMode)];

    cpu.a >= content_to_cmp ? setCarryFlag(cpu) : clearCarryFlag(cpu);
    cpu.a == content_to_cmp ? setZeroFlag(cpu) : clearZeroFlag(cpu);

    let result = cpu.a & content_to_cmp;
    result >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
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