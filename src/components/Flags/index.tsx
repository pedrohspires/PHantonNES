export default function Flags({ flags }: { flags: string }) {
    const flagsLabel = "CZIDB-VN";

    return (
        <div className="flex gap-4 flex-wrap justify-between">
            {new Array(flags.length).fill(0).map((_, index) => {
                return (
                    <div key={index} className="text-center">
                        <p>{flagsLabel[index]}</p>
                        <div className="text-black rounded-sm px-2 w-7 text-center bg-gray-50 cursor-default">{flags[index]}</div>
                    </div>
                )
            })}
        </div>
    )
}
