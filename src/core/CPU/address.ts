import { addressModes } from "../../types/address.d";
import { cpuType } from "../../types/cpu.d";
import { getCombinedAddress, readFirstArgument, readSecondArgument } from "../../utils/address";

export const addressResolve = (cpu: cpuType, mode: addressModes, ignorePageCrossed?: boolean): number => {
    switch (mode) {
        case "immediate": return cpu.pc + 1;

        case "zero_page": return readFirstArgument(cpu);

        case "zero_page_x": {
            const arg = readFirstArgument(cpu);
            const result = arg + cpu.x;

            return result > 0xff ? result - 0x100 : result;
        }

        case "zero_page_y": {
            const arg = readFirstArgument(cpu);
            const result = arg + cpu.y;
            return result > 0xff ? result - 0x100 : result;
        }

        case "absolute": {
            const LSB = readFirstArgument(cpu);
            const MSB = readSecondArgument(cpu);

            return getCombinedAddress(LSB, MSB);
        }

        case "absolute_x": {
            const LSB = readFirstArgument(cpu);
            const MSB = readSecondArgument(cpu);

            let addressAbsolute = getCombinedAddress(LSB, MSB);

            let address = addressAbsolute + cpu.x;

            if (address.toString(16).slice(0, 2) != addressAbsolute.toString(16).slice(0, 2) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        }

        case "absolute_y": {
            const LSB = readFirstArgument(cpu);
            const MSB = readSecondArgument(cpu);

            let addressAbsolute = getCombinedAddress(LSB, MSB);

            let address = addressAbsolute + cpu.y;

            if (address.toString(16).slice(0, 2) != addressAbsolute.toString(16).slice(0, 2) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        }

        case "indirect": {
            let LSB = readFirstArgument(cpu);
            let MSB = readSecondArgument(cpu);

            let addressResolved = getCombinedAddress(LSB, MSB);
            LSB = cpu.memory[addressResolved];
            MSB = cpu.memory[addressResolved + 1];

            return getCombinedAddress(LSB, MSB);
        }

        case "indirect_x": {
            const addressIndirect = readFirstArgument(cpu) + cpu.x;
            const LSB = cpu.memory[addressIndirect];
            const MSB = cpu.memory[addressIndirect + 1];

            return getCombinedAddress(LSB, MSB);
        }

        case "indirect_y": {
            const addressIndirect = readFirstArgument(cpu) + cpu.y;
            const LSB = cpu.memory[addressIndirect];
            const MSB = cpu.memory[addressIndirect + 1];
            const address = getCombinedAddress(LSB, MSB);

            if (address.toString(16).slice(0, 2) != addressIndirect.toString(16).slice(0, 2) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        }
    }

    return 0;
}