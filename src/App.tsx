import { useEffect } from 'react';
import { useCpu } from "./hooks/useCpu";

function App() {
    const [cpu, exec_op_code] = useCpu();

    useEffect(() => {
        console.log(cpu);
    }, [cpu])

    return (
        <div className="w-full h-screen bg-gray-600 grid place-items-center">
            <div>
                <button onClick={() => exec_op_code("69", 0x01)} className='bg-white px-4 py-2 rounded-md'>ADC</button>
            </div>
        </div>
    )
}

export default App
