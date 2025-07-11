import type { cpuType } from "../types/cpu.d";

const modules: any = import.meta.glob('./cpu_instructions/*.ts', { eager: true });
const cpuInstructions: any = {};

for (const path in modules) {
    const keys = Object.keys(modules[path]?.default);
    keys.forEach(key => cpuInstructions[key] = modules[path]?.default[key]);
}

export function exec_cpu_instruction(cpu: cpuType) {
    const op_code = cpu.getOpCode();
    const op_code_function = cpuInstructions[op_code];
    op_code_function(cpu);
}

const cpu: cpuType = {
    a: 0x00,
    x: 0x00,
    y: 0x00,
    pc: 0xc000,
    sp: 0x01ff,
    p: 0b11100100, // NV-BDIZC
    clk: 0x0000,
    memory: new Array(0xffff).fill(0),

    getByteMemory: function (memory_address, signed) {
        if (memory_address) {
            const byte = this.memory[memory_address];
            return signed ? byte - 0x100 : byte;
        }

        const byte = this.memory[this.pc++];
        return signed ? byte - 0x100 : byte;
    },
    setByteMemory: function (memory_address, memory_value) {
        this.memory[memory_address] = memory_value;
    },
    getOpCode: function () {
        return this.memory[this.pc++];
    },
    addressModeResolve: function (address_mode, ignorePageCrossed) {
        const arg1 = address_mode != "accumulator" ? this.getByteMemory() : 0;

        if (address_mode == "immediate" || address_mode == "accumulator")
            this.clk += 2;

        if (address_mode == "zero_page") {
            this.clk += 3;
            return arg1;
        }

        if (address_mode == "zero_page_x") {
            this.clk += 4;
            return arg1 + this.x;
        }

        if (address_mode == "zero_page_y") {
            this.clk += 4;
            return arg1 + this.y;
        }

        if (address_mode == "absolute") {
            this.clk += 4;
            const arg2 = this.getByteMemory();
            return arg2 << 8 | arg1;
        }

        if (address_mode == "absolute_x") {
            this.clk += 4;
            const arg2 = this.getByteMemory();
            const arg = arg2 << 8 | arg1;
            const memory_address = arg + this.x;

            if (memory_address >> 8 != arg >> 8 && !ignorePageCrossed)
                this.clk++; // page crossed

            return memory_address;
        }

        if (address_mode == "absolute_y") {
            this.clk += 4;
            const arg2 = this.getByteMemory();
            const arg = arg2 << 8 | arg1;
            const memory_address = arg + this.y;

            if (memory_address >> 8 != arg >> 8 && !ignorePageCrossed)
                this.clk++; // page crossed

            return memory_address;
        }

        if (address_mode == "indirect_x") {
            this.clk += 6;
            const arg2 = (arg1 + this.x) % 0x100;
            const lsb = this.getByteMemory(arg2);
            const msb = this.getByteMemory(arg2 + 1);
            const memory_address = msb << 8 | lsb;

            return memory_address;
        }

        if (address_mode == "indirect_y") {
            this.clk += 5;
            const lsb = this.getByteMemory(arg1);
            const msb = this.getByteMemory(arg1 + 1);
            const arg = msb << 8 | lsb;
            const memory_address = arg + this.y;

            if (memory_address >> 8 != arg >> 8 && !ignorePageCrossed)
                this.clk++; // page crossed

            return memory_address;
        }

        return arg1; // immediate
    },

    setCarryFlag: function () {
        this.p = this.p | 0b00000001
    },
    setZeroFlag: function () {
        this.p = this.p | 0b00000010
    },
    setInterruptFlag: function () {
        this.p = this.p | 0b00000100
    },
    setDecimalFlag: function () {
        this.p = this.p | 0b00001000
    },
    setBreakFlag: function () {
        this.p = this.p | 0b00010000
    },
    setOverflowFlag: function () {
        this.p = this.p | 0b01000000
    },
    setNegativeFlag: function () {
        this.p = this.p | 0b10000000
    },

    clearCarryFlag: function () {
        this.p = this.p & 0b11111110
    },
    clearZeroFlag: function () {
        this.p = this.p & 0b11111101
    },
    clearInterruptFlag: function () {
        this.p = this.p & 0b11111011
    },
    clearDecimalFlag: function () {
        this.p = this.p & 0b11110111
    },
    clearBreakFlag: function () {
        this.p = this.p & 0b11101111
    },
    clearOverflowFlag: function () {
        this.p = this.p & 0b10111111
    },
    clearNegativeFlag: function () {
        this.p = this.p & 0b01111111
    },

    pushStack: function (value) {
        this.memory[this.sp--] = value;
    },
    pullStack: function () {
        return this.memory[++this.sp];
    }
}

export default cpu;