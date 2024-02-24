import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { isOverflow } from "../../utils/validations";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearOverflowFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setOverflowFlag, setZeroFlag } from "../flags";

export const execSbc = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_sbc = addressMode == "immediate" ? cpu.memory[cpu.pc + 1] : cpu.memory[addressResolve(cpu, addressMode)];
    let carry = Number(cpu.p[0]);

    isOverflow(cpu.a, content_to_sbc, carry, "sbc") ? setOverflowFlag(cpu) : clearOverflowFlag(cpu);

    cpu.a -= content_to_sbc + (1 - carry);

    if (cpu.a > 0xff) {
        clearCarryFlag(cpu);
        cpu.a -= 0x100;
    } else setCarryFlag(cpu);

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