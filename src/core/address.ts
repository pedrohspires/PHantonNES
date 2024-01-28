import { addressModes } from "../types/address.d";
import { cpuType } from "../types/cpu.d";

export const addressResolve = (cpu: cpuType, arg: number, mode: addressModes, ignorePageCrossed?: boolean): number => {
    switch (mode) {
        case "zero_page": return arg;
        case "zero_page_x": return cpu.memory[arg] + cpu.x;
        case "zero_page_y": return cpu.memory[arg] + cpu.y;
        case "absolute": return arg;

        case "absolute_x": {
            let memory_value = cpu.memory[arg];
            let address = memory_value + cpu.x;

            if (address.toString(16).slice(0, 2) != memory_value.toString(16) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        };

        case "absolute_y": {
            let memory_value = cpu.memory[arg];
            let address = memory_value + cpu.y;

            if (address.toString(16).slice(0, 2) != memory_value.toString(16) && !ignorePageCrossed)
                cpu.clock++;

            return address;
        };

        case "indirect": {
            let byte_least_significant = cpu.memory[arg];
            let byte_most_significant = cpu.memory[arg + 1];
            return Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));
        };

        case "indirect_x": {
            let zero_page_x_address = cpu.memory[arg] + cpu.x;
            let byte_least_significant = cpu.memory[zero_page_x_address];
            let byte_most_significant = cpu.memory[zero_page_x_address + 1];
            return Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));
        };

        case "indirect_y": {
            let zero_page_y_address = cpu.memory[arg] + cpu.y;
            let byte_least_significant = cpu.memory[zero_page_y_address];
            let byte_most_significant = cpu.memory[zero_page_y_address + 1];
            let addressResolved = Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));

            if (addressResolved.toString(16).slice(0, 2) != cpu.memory[addressResolved].toString(16) && !ignorePageCrossed)
                cpu.clock++;

            return addressResolved;
        };
    }

    return 0;
}