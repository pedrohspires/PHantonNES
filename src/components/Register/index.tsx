import { minLengthNumber } from "../../utils/format";

type Props = {
    label: string,
    value: number,
    minLength?: number
}

export default function Register({ label, value, minLength = 4 }: Props) {
    const valueFormat = "0x" + minLengthNumber(value, minLength, 16);

    return (
        <div className="text-center">
            <p>{label}</p>
            <div className="text-black rounded-sm px-2 w-20 text-center bg-gray-50 cursor-default">{valueFormat}</div>
        </div>
    )
}
