export function minLengthNumber(num: number, minLength: number, base?: number): string {
    let str = "";
    for (let i = 0; i < minLength; i++)
        str += "0";

    return (str + (num.toString(base))).slice(minLength * (-1));
}