const cpuInitialState = {
    memory: new Array(0xffff).fill(0),
    a: 0,
    x: 0,
    y: 0,
    pc: 0xc000,
    sp: 0x01ff,
    clock: 0,
    p: "00000000" // CZIDB-VN -> indices -> 01234567
}

export default cpuInitialState;