export type cpuType = {
    memory: Array<number>,
    x: number,
    y: number,
    a: number,
    sp: number,
    pc: number,
    p: string,
    cycle: number
}

export type address_mode =
    "immediate" | "zero_page" | "zero_page_x" |
    "zero_page_y" | "absolute" | "absolute_x" |
    "absolute_y" | "indirect" | "indirect_x" | 
    "indirect_y";