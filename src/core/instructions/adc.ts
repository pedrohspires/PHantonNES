import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { isOverflow } from "../../utils/validations";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearOverflowFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setOverflowFlag, setZeroFlag } from "../flags";

export const execAdc = (cpu: cpuType, addressMode: addressModes): void => {
    const arg = cpu.memory[cpu.pc + 1];
    exec(cpu, addressMode, arg);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes, arg: number) => {
    let content_to_add = addressMode == "immediate" ? arg : cpu.memory[addressResolve(cpu, arg, addressMode)];
    let carry = Number(cpu.p[0]);

    isOverflow(cpu.a, content_to_add, carry) ? setOverflowFlag(cpu) : clearOverflowFlag(cpu);

    cpu.a += content_to_add + carry;

    if (cpu.a > 0xff) {
        setCarryFlag(cpu);
        cpu.a -= 0x100;
    } else clearCarryFlag(cpu);

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