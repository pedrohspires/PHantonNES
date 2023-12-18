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

export type op_codes_type =
    "69" | "65" | "75" | "6d" | "7d" | "79" | "61" | "71" | // ADC
    "29" | "25" | "35" | "2d" | "3d" | "39" | "21" | "31" | // AND
    "a9" | "a5" | "b5" | "ad" | "bd" | "b9" | "a1" | "b1" | // LDA
    "a2" | "a6" | "b6" | "ae" | "be" |                      // LDX
    "a0" | "a4" | "b4" | "ac" | "bc" |                      // LDY
    "85" | "95" | "8d" | "9d" | "99" | "81" | "91" |        // STA
    "86" | "96" | "8e" |                                    // STX
    "84" | "94" | "8c"                                      // STY

export type address_mode =
    "immediate" | "zero_page" | "zero_page_x" |
    "zero_page_y" | "absolute" | "absolute_x" |
    "absolute_y" | "indirect" | "indirect_x" |
    "indirect_y" | "accumulator";