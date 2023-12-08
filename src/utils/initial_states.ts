export const initial_cpu = {
    memory: new Array(0xffff).fill(0),
    x: 0x00,
    y: 0x00,
    a: 0x00,
    sp: 0x00,
    pc: 0x0000,
    p: "00000000", // CZIDB-VN
    cycle: 0x0000,
}