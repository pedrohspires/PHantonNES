export type pixelType = {
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a?: number
}

export type ppuScreenType = {
    drawnPixel: (x: number, y: number, r: number, g: number, b: number, a?: number) => void;
    clearScreen: () => void;
}

export type ppuType = {
    memory: Array<number>;
    spr: Array<number>;
    clk: number;
    scl: number; //scanline
    scr: ppuScreenType | null;

    setScreen: (screen: ppuScreenType) => void;
}