import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { addressResolve } from "../address";
import { clearOverflowFlag, setOverflowFlag } from "../flags";

export const execBit = (cpu: cpuType, addressMode: addressModes): void => {
    exec(cpu, addressMode);
    updateClock(cpu, addressMode);
}

const exec = (cpu: cpuType, addressMode: addressModes) => {
    const contentMemory = cpu.memory[addressResolve(cpu, addressMode)]

    const andResult = contentMemory & cpu.a;

    if (!andResult) setOverflowFlag(cpu);
    else clearOverflowFlag(cpu);

    if ((andResult & 0x40) >> 6) setOverflowFlag(cpu);
    else clearOverflowFlag(cpu);

    if (andResult >> 7) setOverflowFlag(cpu);
    else clearOverflowFlag(cpu);
}

const updateClock = (cpu: cpuType, addressMode: addressModes) => {
    let clocksToAdd = 0;
    let pcToAdd = 0;

    switch (addressMode) {
        case "zero_page": clocksToAdd = 3; pcToAdd = 2; break;
        case "absolute": clocksToAdd = 4; pcToAdd = 3; break;
    }

    cpu.clock += clocksToAdd;
    cpu.pc += pcToAdd;
}