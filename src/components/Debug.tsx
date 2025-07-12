import { useState, type ChangeEventHandler } from 'react';
import type { cpuType } from '../types/cpu.d';

const modules: any = import.meta.glob('./core/cpu_instructions/*.ts', { eager: true });
const cpuInstructions: any = {};

for (const path in modules) {
    const keys = Object.keys(modules[path]?.default);
    keys.forEach(key => cpuInstructions[key] = modules[path]?.default[key]);
}

type Props = {
    currentCpu: cpuType;
    handleLoadRom: ChangeEventHandler<HTMLInputElement>;
    init: () => void;
    exec: () => void;
}

function Debug({ currentCpu, handleLoadRom, init, exec }: Props) {
    const [endereco, setEndereco] = useState<number>(0);
    const [qtdInstrucoes, setQtdInstrucoes] = useState<number>(0);

    return (
        <div>
            <div className="max-w-7xl">
                <p>Instrução atual: <b>${currentCpu.pc.toString(16)}: ${currentCpu.memory[currentCpu.pc].toString(16)} - ${currentCpu.memory[currentCpu.pc + 1].toString(16)} - ${currentCpu.memory[currentCpu.pc + 2].toString(16)} - {cpuInstructions[currentCpu.memory[currentCpu.pc]].toString()}</b></p>
                <p>A: <b>${currentCpu.a.toString(16)}</b></p>
                <p>X: <b>${currentCpu.x.toString(16)}</b></p>
                <p>Y: <b>${currentCpu.y.toString(16)}</b></p>
                <p>SP: <b>${currentCpu.sp.toString(16)}</b></p>
                <p>P: <b>${currentCpu.p.toString(2)}</b></p>

                <div>
                    <label htmlFor="consultar">Consultar endereço: </label>
                    <input id="consultar" value={endereco.toString(16)} onChange={e => setEndereco(Number("0x" + (e.target.value || 0)))} />
                    <span>Valor: {currentCpu.memory[endereco].toString(16)} - {currentCpu.memory[endereco + 1].toString(16)} - {currentCpu.memory[endereco + 2].toString(16)}</span>
                </div>

                <div>
                    <p>Memória: </p>
                    <div className="flex flex-wrap gap-2">
                        {currentCpu.memory.slice(0xc000, 0xc0ff).map((x, i) => (<div key={i}>
                            <div>
                                <p>{(i + 0xc000).toString(16)}</p>
                                {x.toString(16)}
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>

            <div className="space-x-4">
                <button
                    type="button"
                    onClick={() => document.getElementById("load_rom_input")?.click()}
                    className="px-4 py-2 bg-gray-500 rounded-lg cursor-pointer"
                >
                    Carregar ROM
                </button>

                <input id="load_rom_input" className="hidden" type="file" onChange={handleLoadRom} accept=".nes" />

                <button
                    type="button"
                    onClick={init}
                    className="px-4 py-2 bg-green-500 rounded-lg cursor-pointer"
                >
                    Iniciar
                </button>

                <button
                    type="button"
                    onClick={exec}
                    className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer"
                >
                    Próxima instrução
                </button>

                <div>
                    <input id="qtd_instrucoes" value={qtdInstrucoes.toString(16)} onChange={e => setQtdInstrucoes(Number("0x" + (e.target.value || 0)))} />
                    <button
                        type="button"
                        onClick={() => {
                            for (let i = 0; i < qtdInstrucoes; i++)
                                exec();
                        }}
                        className="px-4 py-2 bg-yellow-500 rounded-lg cursor-pointer"
                    >
                        Executar {qtdInstrucoes} instruções
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Debug