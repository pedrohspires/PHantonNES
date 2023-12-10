import { address_mode, cpuType } from "../types/cpu.d";
import { minLengthNumber } from "./format";

function page_crossed(cpu: cpuType, addr1: number, addr2: number, cycles: number = 1) {
    let addr1_16_bits = minLengthNumber(addr1, 4, 16);
    let addr2_16_bits = minLengthNumber(addr2, 4, 16);

    if (addr1_16_bits.slice(0, 2) != addr2_16_bits.slice(0, 2))
        cpu.cycle += cycles;
}

export default function address_resolve(cpu: cpuType, arg: number, address_mode: address_mode, ignore_page_crossed: boolean = false): number {
    switch (address_mode) {
        case "zero_page": return arg;

        case "zero_page_x": {
            let addr = arg + cpu.x;
            if (addr > 0xff) addr -= 0x100;

            return addr;
        };

        case "zero_page_y": {
            let addr = arg + cpu.y;
            if (addr > 0xff) addr -= 0x100;

            return addr;
        };

        case "absolute": return arg;

        case "absolute_x": {
            let address = arg + cpu.x;

            if (!ignore_page_crossed)
                page_crossed(cpu, address, arg);

            return address;
        };

        case "absolute_y": {
            let address = arg + cpu.y;

            if (!ignore_page_crossed)
                page_crossed(cpu, address, arg)

            return address;
        };

        case "indirect": {
            let byte_least_significant = cpu.memory[arg];
            let byte_most_significant = cpu.memory[arg + 1];
            return Number("0x" + byte_most_significant.toString(16) + byte_least_significant.toString(16));
        };

        case "indirect_x": {
            let zero_page_x_address = arg + cpu.x;
            let byte_least_significant = minLengthNumber(cpu.memory[zero_page_x_address], 2, 16);
            let byte_most_significant = minLengthNumber(cpu.memory[zero_page_x_address + 1], 2, 16);
            return Number("0x" + byte_most_significant + byte_least_significant);
        };

        case "indirect_y": {
            let byte_least_significant = minLengthNumber(cpu.memory[arg], 2, 16);
            let byte_most_significant = minLengthNumber(cpu.memory[arg + 1], 2, 16);
            let resolved_address = Number("0x" + byte_most_significant + byte_least_significant);

            let address = resolved_address + cpu.y;

            if (!ignore_page_crossed)
                page_crossed(cpu, resolved_address, address)

            return address;
        };
    }

    return 0;
}