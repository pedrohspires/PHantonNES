export const isOverflow = (a: number, operand: number, carry: number, instruction?: "adc" | "sbc") => {
    switch (instruction) {
        case "sbc": return overflowSbc(a, operand, carry);

        default: return overflowAdc(a, operand, carry); // adc | undefined
    }
}

const overflowAdc = (a: number, operand: number, carry: number) => {
    const sinal_a = (a & 0x80) >> 7;
    const sinal_add = (operand & 0x80) >> 7;

    const sinal_operacao = ((a + operand + carry) & 0x80) >> 7;
    return (sinal_a == sinal_add) && (sinal_a != sinal_operacao);
}

const overflowSbc = (a: number, operand: number, carry: number) => {
    const result = a - operand + (1 - carry);
    return ((a ^ operand) & 0x80) != 0 && ((a ^ result) & 0x80) != 0;
}