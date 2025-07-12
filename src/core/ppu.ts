import type { cpuType } from "../types/cpu.d";
import type { ppuType } from "../types/ppu.d";

export function exec_ppu_instruction(currentPpu: ppuType, currentCpu: cpuType) {
    for (let cycle = 0; cycle < 3; cycle++) {
        if (currentPpu.clk++ % 262 == 0 && currentPpu.clk > 0)
            currentPpu.scl++;

        // vblank
        if (currentPpu.scl == 240) currentCpu.memory[0x2002] |= 0b10000000;

        if (currentPpu.scl > 240) {
            // vblank
            continue;
        }

        // desenho da dela
    }
}

const ppu: ppuType = {
    memory: new Array(0xffff).fill(0),
    spr: new Array(0x100).fill(0),
    clk: 0,
    scl: 0,
    scr: null,

    setScreen: function (screen) {
        this.scr = screen;
    }
}

export default ppu;