import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execAsl = (cpu: cpuType, addresMode: addressModes): void => {
    const arg = cpu.memory[cpu.pc + 1];
    exec(cpu, addresMode, arg);
    updateClock(cpu, addresMode);
}

const exec = (cpu: cpuType, addresMode: addressModes, arg: number) => {
    const address = addressResolve(cpu, arg, addresMode, true)
    let content = addresMode == "accumulator" ? cpu.a : cpu.memory[address];

    content >> 7 ? setCarryFlag(cpu) : clearCarryFlag(cpu);

    const newContent = content << 1;

    if (addresMode == "accumulator") {
        cpu.a = newContent;
    } else {
        cpu.memory[address] = content;
    }

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    content >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addresMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addresMode) {
        case "accumulator": clocksToAdd = 2; pcToAdd = 1; break;
        case "zero_page": clocksToAdd = 5; pcToAdd = 2; break;
        case "zero_page_x": clocksToAdd = 6; pcToAdd = 2; break;
        case "absolute": clocksToAdd = 6; pcToAdd = 3; break;
        case "absolute_x": clocksToAdd = 7; pcToAdd = 3; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}