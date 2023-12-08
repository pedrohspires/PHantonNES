import { ChangeEvent, useState } from "react"
import { minLengthNumber } from "../../utils/format";
import Input from "../Input";

export default function Memoria({ mem }: { mem: Array<number> }): JSX.Element {
    const [start, setStart] = useState<string>("0x00");
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
                    <Input
                        id="mem_start"
                        label="Início"
                        value={start}
                        onChange={handleChangeInput}
                    />
                    <Input
                        id="mem_length"
                        label="Tamanho"
                        value={length}
                        onChange={handleChangeInput}
                    />
                </div>
            </div>

            <div className="mt-2">
                {mem.slice(Number(start), Number(start) + Number(length) + 1).map((item, index) => {
                    if (index % 16 == 0)
                        return (
                            <span key={index}>
                                {index != 0 && <br />}
                                <span className="bg-gray-500 px-1 w-12 inline-block mr-2">
                                    {minLengthNumber(index + Number(start), 4, 16)}
                                </span>
                                <span className="inline-block w-7">{minLengthNumber(item, 2, 16)}</span>
                            </span>
                        )

                    return <span key={index} className="inline-block w-7">{minLengthNumber(item, 2, 16)}</span>
                })}
            </div>
        </div>
    )
}
