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

export type op_codes_type = "69" | "65" | "75" | "6d" | "7d" | "79" | "61" | "71" //ADC codes


export type address_mode =
    "immediate" | "zero_page" | "zero_page_x" |
    "zero_page_y" | "absolute" | "absolute_x" |
    "absolute_y" | "indirect" | "indirect_x" |
    "indirect_y";