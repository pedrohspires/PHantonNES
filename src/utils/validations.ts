export function isOverflow(a: number, add: number, carry: number) {
    const sinal_a = (a & 0x80) >> 7;
    const sinal_add = (add & 0x80) >> 7;

    const sinal_operacao = ((a + add + carry) & 0x80) >> 7;
    const overflow = (sinal_a == sinal_add) && (sinal_a != sinal_operacao);

    return overflow;
}