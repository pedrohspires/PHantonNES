import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { isOverflow } from "../../utils/validations";
import { addressResolve } from "../address";
import { clearCarryFlag, clearNegativeFlag, clearOverflowFlag, setCarryFlag, setNegativeFlag, setOverflowFlag } from "../flags";

export const execAddOpCode69 = (cpu: cpuType, addresMode: addressModes): void => {
    const arg = cpu.memory[cpu.pc + 1];
    exec(cpu, addresMode, arg);
    updateClock(cpu, addresMode);
}

const exec = (cpu: cpuType, addresMode: addressModes, arg: number) => {
    let content_to_add = addresMode == "immediate" ? arg : cpu.memory[addressResolve(cpu, arg, addresMode)];
    let carry = Number(cpu.p[0]);

    if (isOverflow(cpu.a, content_to_add, carry)) setOverflowFlag(cpu);
    else clearOverflowFlag(cpu);

    cpu.a += content_to_add + carry;

    if (cpu.a > 0xff) {
        setCarryFlag(cpu);
        cpu.a -= 0x100;
    } else clearCarryFlag(cpu);

    if (cpu.a >> 7) setNegativeFlag(cpu);
    else clearNegativeFlag(cpu);
}

const updateClock = (cpu: cpuType, addresMode: addressModes) => {
    let clocksToAdd = 0;

    switch (addresMode) {
        case "immediate": clocksToAdd = 2; break;
        case "zero_page": clocksToAdd = 3; break;
        case "zero_page_x": clocksToAdd = 4; break;
        case "absolute": clocksToAdd = 4; break;
        case "absolute_x": clocksToAdd = 4; break;
        case "absolute_y": clocksToAdd = 4; break;
        case "indirect_x": clocksToAdd = 6; break;
        case "indirect_y": clocksToAdd = 5; break;
    }

    cpu.clock += clocksToAdd;
}