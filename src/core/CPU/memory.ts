import { cpuType } from "../../types/cpu.d";

export const updateMemoryMap = (cpu: cpuType, addr: number) => {
    if (addr < 0x0800) {
        while (addr < 0x2000) {
            cpu.memory[addr + 0x0800] = cpu?.memory[addr];
            addr += 0x0800;
        }
        return;
    }
    if (addr >= 0x2000 && addr <= 0x2007) {
        while (addr < 0x4000) {
            cpu.memory[addr + 0x8] = cpu?.memory[addr];
            addr += 0x8;
        }
        return;
    }
}