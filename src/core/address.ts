import { addressModes } from "../types/address.d";
import { cpuType } from "../types/cpu.d";
import { formatNumber } from "../utils/format";

const getCombinedAddress = (lowByte: number, highByte: number) => {
    return Number("0x" + formatNumber(highByte, 2) + formatNumber(lowByte, 2))
};

export const addressResolve = (cpu: cpuType, mode: addressModes, ignorePageCrossed?: boolean): number => {
    switch (mode) {
        case "zero_page": return cpu.memory[cpu.pc + 1];

        case "zero_page_x": {
            const arg = cpu.memory[cpu.pc + 1];
            const result = arg + cpu.x;

            return result > 0xff ? result - 0x100 : result;
        }

        case "zero_page_y": {
            const arg = cpu.pc + 1;
            const result = arg + cpu.y;
            return result > 0xff ? result - 0x100 : result;
        }

        case "absolute": {
            const arg1 = cpu.memory[cpu.pc + 1];
            const arg2 = cpu.memory[cpu.pc + 2];

            return getCombinedAddress(arg1, arg2);
        }

        case "absolute_x": {
            const arg1 = cpu.memory[cpu.pc + 1];
            const arg2 = cpu.memory[cpu.pc + 2];

            let addressAbsolute = getCombinedAddress(arg1, arg2);

            let address = addressAbsolute + cpu.x;

            if (address.toString(16).slice(0, 2) != addressAbsolute.toString(16).slice(0, 2) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        }

        case "absolute_y": {
            const arg1 = cpu.memory[cpu.pc + 1];
            const arg2 = cpu.memory[cpu.pc + 2];

            let addressAbsolute = getCombinedAddress(arg1, arg2);

            let address = addressAbsolute + cpu.y;

            if (address.toString(16).slice(0, 2) != addressAbsolute.toString(16).slice(0, 2) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        }

        case "indirect": {
            const arg1 = cpu.memory[cpu.pc + 1];
            const arg2 = cpu.memory[cpu.pc + 2];

            let addressResolved = getCombinedAddress(arg1, arg2);
            const lowByte = cpu.memory[addressResolved];
            const highByte = cpu.memory[addressResolved + 1];

            return getCombinedAddress(lowByte, highByte);
        }

        case "indirect_x": {
            const addressIndirect = cpu.memory[cpu.pc + 1] + cpu.x;
            const arg1 = cpu.memory[addressIndirect];
            const arg2 = cpu.memory[addressIndirect + 1];

            return getCombinedAddress(arg1, arg2);
        }

        case "indirect_y": {
            const addressIndirect = cpu.memory[cpu.pc + 1] + cpu.y;
            const arg1 = cpu.memory[addressIndirect];
            const arg2 = cpu.memory[addressIndirect + 1];

            return getCombinedAddress(arg1, arg2);
        }
    }

    return 0;
}