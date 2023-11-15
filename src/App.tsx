import { useState } from "react"
import { useCpu } from "./hooks/useCpu";

function App() {
    const [cpu, get_exec] = useCpu();

    return (
        <div className="w-full h-screen bg-gray-600 grid place-items-center">
            {/* <button onClick={cpu_loop} className="py-4 px-8 bg-white rounded-md">Calcular</button> */}

            <div>
                <span>A: {cpu.a}</span>
            </div>
        </div>
    )
}

export default App
