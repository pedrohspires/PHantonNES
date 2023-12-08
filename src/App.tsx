import { useEffect, useState } from 'react';
import { useCpu } from "./hooks/useCpu";
import Monitor from './components/Monitor';
import Debug from './components/Debug';
import Input from './components/Input';

function App() {
    const { cpu, exec_op_code } = useCpu();

    const [opCode, setOpCode] = useState<string>("");
    const [arg, setArg] = useState<string>("");

    useEffect(() => {
        console.log(cpu);
    }, [cpu])

    function handleClick(): void {
        exec_op_code("69", 0x0f)
    }


    return (
        <div className="w-full h-screen bg-gray-600 grid place-items-center">
            <div className='flex gap-4 text-white'>
                <Input
                    id='op_code'
                    label='OP. CODE'
                    value={opCode}
                    onChange={setOpCode}
                />

                <Input
                    id='arg'
                    label='arg'
                    value={arg}
                    onChange={setArg}
                />
            </div>

            <button onClick={e => { e.preventDefault(); handleClick() }} className='bg-white rounded-md p-2'>Executar</button>
            <div className='flex gap-4 h-[480px]'>
                <Monitor />

                <Debug cpu={cpu} />
            </div>
        </div>
    )
}

export default App
