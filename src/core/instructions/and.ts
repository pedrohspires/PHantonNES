import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearNegativeFlag, clearZeroFlag, setNegativeFlag, setZeroFlag } from "../flags";

export const execAnd = (cpu: cpuType, addressMode: addressModes): void => {
    console.log("inicio exec")
    exec(cpu, addressMode);
    console.log("fim exec")
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_and = addressMode == "immediate" ? cpu.memory[cpu.pc + 1] : cpu.memory[addressResolve(cpu, addressMode)];

    console.log(content_to_and.toString(2))
    console.log(cpu.a.toString(2))
    cpu.a = cpu.a & content_to_and;
    console.log(cpu.a.toString(2))

    cpu.a == 0 ? setZeroFlag(cpu) : clearZeroFlag(cpu);
    cpu.a >> 7 ? setNegativeFlag(cpu) : clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "immediate": clocksToAdd = 2; pcToAdd = 2; break;
        case "zero_page": clocksToAdd = 3; pcToAdd = 2; break;
        case "zero_page_x": clocksToAdd = 4; pcToAdd = 2; break;
        case "absolute": clocksToAdd = 4; pcToAdd = 3; break;
        case "absolute_x": clocksToAdd = 4; pcToAdd = 3; break;
        case "absolute_y": clocksToAdd = 4; pcToAdd = 3; break;
        case "indirect_x": clocksToAdd = 6; pcToAdd = 2; break;
        case "indirect_y": clocksToAdd = 5; pcToAdd = 2; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}