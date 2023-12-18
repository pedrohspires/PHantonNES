import { address_mode, cpuType } from "../../types/cpu.d";
import address_resolve from "../address";
import { clearCarryFlag, clearNegativeFlag, setCarryFlag, setNegativeFlag } from "../flags_operations";

export const asl = (cpu: cpuType, arg: number, address_mode: address_mode): cpuType => {
    let carry = 0x0;

    if (address_mode == "accumulator") {
        carry = cpu.a >> 7;
        cpu.a = cpu.a << 1;

        if (cpu.a > 0xff)
            cpu.a = cpu.a - 0x100;

        cpu.p = cpu.a >> 7 ? setNegativeFlag(cpu.p) : clearNegativeFlag(cpu.p);
    }
    else {
        let address = address_resolve(cpu, arg, address_mode, true);
        carry = cpu.memory[address] >> 7;
        cpu.memory[address] = cpu.memory[address] << 1;

        if (cpu.memory[address] > 0xff)
            cpu.memory[address] = cpu.memory[address] - 0x100;

        cpu.p = cpu.memory[address] >> 7 ? setNegativeFlag(cpu.p) : clearNegativeFlag(cpu.p);
    }
    cpu.p = carry ? setCarryFlag(cpu.p) : clearCarryFlag(cpu.p);

    return cpu;
}