import type { cpuType } from "../types/cpu.d";
import type { ppuType } from "../types/ppu.d";

export function exec_ppu_instruction(currentPpu: ppuType, currentCpu: cpuType) {
    for (let cycle = 0; cycle < 3; cycle++) {
        // scanlines superiores e inferiores cortados cortados
        if (currentPpu.scl >= 8 && currentPpu.scl < 232) {
            // desenha na tela
        }

        // vblank
        if (currentPpu.scl == 240) currentCpu.memory[0x2002] |= 0b10000000;

        // retorna para o primeiro scanline
        currentPpu.scl = ++currentPpu.scl % 262
    }
}

const ppu: ppuType = {
    memory: new Array(0xffff).fill(0),
    spr: new Array(0x100).fill(0),
    scl: 0,
}

export default ppu;