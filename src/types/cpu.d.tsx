export type cpuType = {
    a: number;
    x: number;
    y: number;
    pc: number;
    sp: number;
    p: number;
    memory: Array<number>;
    getByteMemory: (memory_byte?: number) => number;
    getOpCode: () => number;
}

export type addressModeType = "immediate" | "zero_page" | "zero_page_x" | "absolute" | "absolute_x" | "absolute_y" | "indirect_x" | "indirect_y";