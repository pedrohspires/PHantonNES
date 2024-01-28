import { cpuType } from "../../types/cpu.d";

export const execBcc = (cpu: cpuType): void => {
    const arg = cpu.memory[cpu.pc + 1];
    exec(cpu, arg);
    cpu.pc += 2;
}

const exec = (cpu: cpuType, arg: number) => {
    let carry = Number(cpu.p[0]);

    if (!carry) {
        let oldPc = cpu.pc;

        cpu.pc += arg - 128;
        cpu.clock += (oldPc.toString(16).substring(0, 2) != cpu.pc.toString(16).substring(0, 2) ? 5 : 3); // 2 + 1 pelo sucesso + 2 se foi para nova página
    }
}