import { useEffect } from 'react';
import { useCpu } from "./hooks/useCpu";
import Monitor from './components/Monitor';
import Debug from './components/Debug';

function App() {
    const [cpu, exec_op_code] = useCpu();

    useEffect(() => {
        console.log(cpu);
    }, [cpu])

    function handleClick(): void {
        exec_op_code("65", 3)
    }

    return (
        <div className="w-full h-screen bg-gray-600 grid place-items-center">
            <button onClick={handleClick} className='bg-white rounded-md p-2'>Executar</button>
            <div className='flex gap-4 h-[480px]'>
                <Monitor />

                <Debug cpu={cpu} />
            </div>
        </div>
    )
}

export default App
