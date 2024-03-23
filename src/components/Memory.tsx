import { Fragment, useState } from "react";
import { cpuType } from "../types/cpu.d";
import { formatNumber } from "../utils/format";

type Props = {
    cpu: cpuType,
}

export default function Memory({ cpu }: Props) {
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
                            className="px-2 rounded-md w-16"
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
                            onChange={e => {
                                var number = Number("0x" + (e.target.value || 0));
                                if (number <= 0xff)
                                    setLength(number);
                            }}
                        />
                    </div>
                </div>

            </div>

            <div
                className="mt-2 items-center justify-items-center"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                }}
            >
                <div className="col-span-2 w-full h-full bg-sky-950">{/* primeira coluna */}</div>
                {new Array(16).fill(0).map((_, index) => {
                    return (
                        <div className="text-white bg-sky-950 px-1 font-bold" key={index}>{formatNumber(index, 2)}</div>
                    )
                })}

                {start % 16 != 0 && (
                    <>
                        <div className="p-1 col-span-2 text-center bg-sky-950 text-white font-bold w-full">{formatNumber((start - (start % 16)))} </div>

                        {new Array(start % 16).fill(0).map((_, index) => {
                            return (
                                <div className="text-white font-bold" key={index}>-</div>
                            )
                        })}
                    </>
                )}

                {new Array((length - start % 16) + 1).fill(0).map((_, index) => {
                    const result = <div className="text-white font-bold" key={index}>{formatNumber(cpu?.memory[start + index] || 0, 2)}</div>;

                    if ((index + start) % 16 == 0)
                        return (
                            <Fragment key={index}>
                                <div className="p-1 col-span-2 text-center bg-sky-950 text-white font-bold w-full">{formatNumber((index + start))} </div>
                                {result}
                            </Fragment>
                        );

                    return result;
                })}
            </div>
        </div>
    )
}
