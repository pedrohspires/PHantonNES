type Props = {
    label: string,
    value: number
}

export default function Register({ label, value }: Props) {
    const valueFormat = "0x" + ("0000" + value.toString(16)).slice(-4);

    return (
        <div className="text-center">
            <p>{label}</p>
            <input className="text-black rounded-sm px-2 w-20 text-center bg-gray-50" value={valueFormat} />
        </div>
    )
}
