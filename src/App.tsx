import { useEffect, useState } from 'react';
import Debug from './components/Debug';
import Input from './components/Input';
import Monitor from './components/Monitor';
import { useCpu } from "./hooks/useCpu";
import { op_codes_type } from './types/cpu.d';

function App() {
    const { cpu, exec_op_code, reset_cpu } = useCpu();

    const [opCode, setOpCode] = useState<string>("");
    const [arg, setArg] = useState<string>("0x");

    useEffect(() => {
        console.log(cpu);
    }, [cpu])

    function handleClick(): void {
        exec_op_code((opCode as op_codes_type), Number(arg))
    }

    function run_program() {
        exec_op_code("a0", 0x01);
        exec_op_code("a9", 0x03);
        exec_op_code("85", 0x01);
        exec_op_code("a9", 0x07);
        exec_op_code("85", 0x02);
        exec_op_code("a2", 0x0a);
        exec_op_code("86", 0x0704);
        exec_op_code("b1", 0x01);
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
                    onChange={(value) => setArg(value.length >= 2 ? value : arg)}
                />
            </div>

            <div className='flex gap-4'>
                <button onClick={e => { e.preventDefault(); run_program() }} className='bg-white rounded-md p-2'>Executar programa</button>
                <button onClick={e => { e.preventDefault(); handleClick() }} className='bg-white rounded-md p-2'>Executar</button>
                <button onClick={e => { e.preventDefault(); reset_cpu() }} className='bg-white rounded-md p-2'>Reset</button>
            </div>
            <div className='flex gap-4 h-[480px]'>
                <Monitor />

                <Debug cpu={cpu} />
            </div>
        </div>
    )
}

export default App
