import { address_mode, cpuType } from "../types/cpu.d";

function page_crossed(cpu: cpuType, addr1: number, addr2: number, cycles: number = 1) {
    if (addr1.toString(16).slice(0, 2) != addr2.toString(16))
        cpu.cycle += cycles;
}

export default function address_resolve(cpu: cpuType, arg: number, address_mode: address_mode, ignore_page_crossed: boolean = false): number {
    switch (address_mode) {
        case "zero_page": return arg;

        case "zero_page_x": {
            let addr = cpu.memory[arg] + cpu.x;
            if (addr > 0xff) addr -= 0x100;

            return addr;
        };

        case "zero_page_y": {
            let addr = cpu.memory[arg] + cpu.y;
            if (addr > 0xff) addr -= 0x100;

            return addr;
        };

        case "absolute": return arg;

        case "absolute_x": {
            let memory_value = cpu.memory[arg];
            let address = memory_value + cpu.x;

            if (!ignore_page_crossed)
                page_crossed(cpu, address, memory_value);

            return address;
        };

        case "absolute_y": {
            let memory_value = cpu.memory[arg];
            let address = memory_value + cpu.y;

            if (!ignore_page_crossed)
                page_crossed(cpu, address, memory_value)

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

            if (!ignore_page_crossed)
                page_crossed(cpu, zero_page_y_address, cpu.memory[arg])

            let byte_least_significant = cpu.memory[zero_page_y_address];
            let byte_most_significant = cpu.memory[zero_page_y_address + 1];

            return Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));
        };
    }

    return 0;
}