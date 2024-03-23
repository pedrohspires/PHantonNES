import { formatNumber } from "../utils/format";

type Props = {
    value: number | null,
    label: string,
    is16Bits?: boolean
}

export default function Register({ value, label, is16Bits }: Props) {
    const minLength = is16Bits ? 4 : 2;

    return (
        <div className="w-16 text-center">
            <span className="font-bold text-white">{label}</span>
            <div className="w-16 h-12 bg-white rounded-md flex items-center justify-center font-bold cursor-default">
                0x{formatNumber(value || 0, minLength)}
            </div>
        </div>
    )
}
