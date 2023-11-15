export function decToBin(num: number): string {
    let numBin = '00000000' + num.toString(2);
    return numBin.slice(-8);
}