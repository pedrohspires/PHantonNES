import type { cpuType } from "../types/cpu.d";

const modules: any = import.meta.glob('./cpu_instructions/*.ts', { eager: true });
const cpuInstructions: any = {};

for (const path in modules) {
    const key = Object.keys(modules[path]?.default)[0];
    cpuInstructions[key] = modules[path]?.default[key];
}

export function exec_cpu_instruction(cpu: cpuType) {
    const op_code = cpu.getOpCode();
    const op_code_function = cpuInstructions[op_code];
    op_code_function(cpu);
}