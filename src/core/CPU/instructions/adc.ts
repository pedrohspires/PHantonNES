
import { addressModes } from "../../../types/address.d";
import { cpuType } from "../../../types/cpu.d";
import { addressResolve } from "../../../utils/address";
import { clearCarryFlag, clearNegativeFlag, clearOverflowFlag, clearZeroFlag, setCarryFlag, setNegativeFlag, setOverflowFlag, setZeroFlag } from "../../../utils/flags";
import { isOverflow } from "../../../utils/validations";

export const execAdc = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    let content_to_add = cpu.memory[addressResolve(cpu, addressMode)];
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