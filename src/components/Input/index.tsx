type Props = {
    id: string,
    label: string,
    value: any,
    onChange: (value: any) => void
}

export default function Input({ id, label, value, onChange }: Props) {
    return (
        <div>
            <label htmlFor={id}>{label}: </label>
            <input
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-20 text-black px-2 rounded-md"
            />
        </div>
    )
}
