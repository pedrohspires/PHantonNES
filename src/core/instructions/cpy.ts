import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execCpy = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_cpy = cpu.memory[addressResolve(cpu, addressMode)];

    cpu.y >= content_to_cpy ? setCarryFlag(cpu) : clearCarryFlag(cpu);
    cpu.y == content_to_cpy ? setZeroFlag(cpu) : clearZeroFlag(cpu);

    let result = cpu.y & content_to_cpy;
    result >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "immediate": pcToAdd = 2; clocksToAdd = 2; break;
        case "zero_page": pcToAdd = 2; clocksToAdd = 3; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 4; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}