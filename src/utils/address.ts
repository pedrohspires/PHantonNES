import { address_mode, cpuType } from "../types/cpu.d";

export default function address_resolve(cpu: cpuType, arg: number, address_mode: address_mode): number {
    switch (address_mode) {
        case "zero_page": return arg;
        case "zero_page_x": return cpu.memory[arg] + cpu.x;
        case "zero_page_y": return cpu.memory[arg] + cpu.y;
        case "absolute": return arg;
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
            return Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));
        };
    }

    return 0;
}