export function formatNumber(value: number, minLength: number = 4, base: number = 16): string {
    const zeros = new Array(minLength).fill("0").reduce(prevValue => "0" + prevValue, "");
    let number = zeros + value.toString(base);

    number = number.slice(minLength * -1);
    return number;
}