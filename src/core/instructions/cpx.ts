import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execCpx = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_cpx = addressMode == "immediate" ? cpu.memory[cpu.pc + 1] : cpu.memory[addressResolve(cpu, addressMode)];

    cpu.x >= content_to_cpx ? setCarryFlag(cpu) : clearCarryFlag(cpu);
    cpu.x == content_to_cpx ? setZeroFlag(cpu) : clearZeroFlag(cpu);

    let result = cpu.x & content_to_cpx;
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