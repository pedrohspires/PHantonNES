import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../../../utils/flags";
import { addressResolve } from "../address";
import { updateMemoryMap } from "../memory";

export const execInc = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let addressMemory = addressResolve(cpu, addressMode, true);

    cpu.memory[addressMemory]++;
    updateMemoryMap(cpu, addressMemory);

    cpu.memory[addressMemory] == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.memory[addressMemory] >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "zero_page": pcToAdd = 2; clocksToAdd = 5; break;
        case "zero_page_x": pcToAdd = 2; clocksToAdd = 6; break;
        case "absolute": pcToAdd = 3; clocksToAdd = 6; break;
        case "absolute_x": pcToAdd = 3; clocksToAdd = 7; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}