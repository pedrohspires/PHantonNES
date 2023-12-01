import { ChangeEvent, useState } from "react"
import { minLengthNumber } from "../../utils/format";

export default function Memoria({ mem }: { mem: Array<number> }): JSX.Element {
    const [start, setStart] = useState<string>("0xff");
    const [length, setLength] = useState<string>("0xff");

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value.length > 1 && event.target.value.length < 7) {
            if (event.target.id == "mem_start") setStart(event.target.value)
            else setLength(event.target.value);
        }
    }

    return (
        <div className="p-1 border border-gray-200 h-full">
            <div className="flex justify-between">
                <span>Memória</span>

                <div className="flex gap-2">
                    <div>
                        <label htmlFor="mem_start">Início: </label>
                        <input
                            id="mem_start"
                            value={start}
                            onChange={handleChangeInput}
                            className="w-20 text-black px-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="mem_length">Tamanho: </label>
                        <input
                            id="mem_length"
                            value={length}
                            onChange={handleChangeInput}
                            className="w-20 text-black px-2"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2">
                {mem.slice(Number(start), Number(start) + Number(length) + 1).map((item, index) => {
                    console.log((index + Number(start)).toString(16))
                    if (index % 16 == 0)
                        return <>{index != 0 && <br />}<span className="bg-gray-500 px-1 w-12 inline-block mr-2">{minLengthNumber(index + Number(start), 4, 16)}</span></>

                    return <span className="inline-block w-7">{minLengthNumber(item, 2, 16)}</span>
                })}
            </div>
        </div>
    )
}
