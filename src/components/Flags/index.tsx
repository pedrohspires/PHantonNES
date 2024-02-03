import { useContext } from "react";
import cpuContext from "../../context/cpuContext";

export default function Flags() {
    const cpu = useContext(cpuContext);
    const flags = "NV-BDIZC";

    const renderFlag = (value: string, label: string): JSX.Element => {
        return (
            <div className="w-8 text-center" key={label}>
                <span className="font-bold text-white">{label}</span>
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold cursor-default">
                    {value}
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-evenly">
            {cpu?.p.split("").reverse().map((item, index) => renderFlag(item, flags[index]))}
        </div>
    )
}
