import { useContext, useState } from "react";
import cpuContext from "../../context/cpuContext";
import { formatNumber } from "../../utils/format";

export default function Memory() {
    const cpu = useContext(cpuContext);
    const [start, setStart] = useState<number>(0x00);
    const [length, setLength] = useState<number>(0xff);

    return (
        <div className="border border-white w-full h-full rounded-md p-4 overflow-auto">
            <div className="flex justify-between">
                <span className="text-white font-bold text-lg">Memory</span>

                <div className="flex gap-4">
                    <div>
                        <label htmlFor="start" className="font-bold text-white">Start: </label>
                        <input
                            id="start"
                            className="px-2 rounded-md w-12"
                            value={start.toString(16)}
                            onChange={e => setStart(Number("0x" + (e.target.value || 0)))}
                        />
                    </div>

                    <div>
                        <label htmlFor="length" className="font-bold text-white">Length: </label>
                        <input
                            id="length"
                            className="px-2 rounded-md w-12"
                            value={length.toString(16)}
                            onChange={e => setLength(Number("0x" + (e.target.value || 0)))}
                        />
                    </div>
                </div>

            </div>

            <div
                className="gap-2 mt-2 items-center justify-items-center"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                }}
            >
                {start % 16 != 0 && (
                    <>
                        <span className="p-1 col-span-2 text-center bg-sky-950 text-white font-bold">0x{formatNumber((start - (start % 16)))} </span>
                        {new Array(start % 16).fill(0).map(() => {
                            return (
                                <span>-</span>
                            )
                        })}
                    </>
                )}

                {new Array(length).fill(0).map((_, index) => {
                    const result = <span>{formatNumber(cpu?.memory[start + index] || 0, 2)}</span>;

                    if ((index + start) % 16 == 0)
                        return (
                            <>
                                <span className="p-1  col-span-2 text-center bg-sky-950 text-white font-bold">0x{formatNumber((index + start))} </span>
                                {result}
                            </>
                        );

                    return result;
                })}
            </div>
        </div>
    )
}
