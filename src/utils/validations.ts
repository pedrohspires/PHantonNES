export function isOverflow(a: number, add: number) {
    let xorResult = a ^ add;
    let signBit = xorResult & 0x80;
    let overflowFlag = (signBit >> 7) & 0x01;

    return overflowFlag == 1;
}