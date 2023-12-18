import { cpuType } from "../types/cpu.d";
import { initial_cpu } from "./initial_states";

export function innitial_state_cpu(): cpuType {
    let cpu = initial_cpu;

    cpu.memory[0x02] = 128;
    cpu.a = 127;

    return cpu;
}