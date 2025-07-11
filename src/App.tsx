import { useState } from "react";
import cpu, { exec_cpu_instruction } from "./core/cpu";
import type { cpuType } from "./types/cpu.d";
import { _16kb } from "./utils/constants";

function App() {
	const [currentCpu, setCurrentCpu] = useState<cpuType>(cpu);
	const [endereco, setEndereco] = useState<number>(0);

	function handleLoadRom(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.onload = event => {
				if (event.target?.result) {
					const rom = new Uint8Array(event.target?.result as ArrayBuffer);
					changeCpuMemory(rom);
					init();
				}
			}

			reader.readAsArrayBuffer(event.target.files[0]);
		}
	}

	function isRomValid(new_rom: Uint8Array) {
		return (
			new_rom[0x00] == 0x4e &&
			new_rom[0x01] == 0x45 &&
			new_rom[0x02] == 0x53 &&
			new_rom[0x03] == 0x1a
		)
	}

	function changeCpuMemory(new_rom: Uint8Array) {
		if (isRomValid(new_rom)) {
			const pgr_length = new_rom[4];
			const has_trainer = !!(new_rom[6] >> 1 & 1);
			const start_pgr = has_trainer ? 528 : 16;

			const pgr_banks = new_rom.slice(start_pgr, _16kb * pgr_length + start_pgr);

			if (pgr_length == 0x01) {
				// Mudar quando for implementar Maper diferente de 0 (PGR espelhada)
				for (let i = 0; i < pgr_banks.length; i++) {
					cpu.memory[i + 0x8000] = pgr_banks[i];
					cpu.memory[i + 0xc000] = pgr_banks[i];
				}
				cpu.pc = (cpu.memory[0xfffd] << 8) | cpu.memory[0xfffc];
			}
		}
	}

	function loop(cyclesPerFrame: number) {
		for (let cycle = 0; cycle < cyclesPerFrame; cycle++) {
			exec_cpu_instruction(cpu);
			setCurrentCpu({ ...cpu });
		}


		requestAnimationFrame(() => loop(cyclesPerFrame));
	}

	function init() {
		const cyclesPerFrame = (1.79 * 1000000) / 60;
		loop(cyclesPerFrame);
	}

	return (
		<>
			<div className="grid w-screen h-screen place-items-center">
				<div className="max-w-7xl">
					<p>Instrução atual: <b>${currentCpu.pc.toString(16)}: ${currentCpu.memory[currentCpu.pc].toString(16)} - ${currentCpu.memory[currentCpu.pc + 1].toString(16)} - ${currentCpu.memory[currentCpu.pc + 2].toString(16)}</b></p>
					<p>A: <b>${currentCpu.a.toString(16)}</b></p>
					<p>X: <b>${currentCpu.x.toString(16)}</b></p>
					<p>Y: <b>${currentCpu.y.toString(16)}</b></p>
					<p>SP: <b>${currentCpu.sp.toString(16)}</b></p>
					<p>P: <b>${currentCpu.p.toString(2)}</b></p>

					<div>
						<label htmlFor="consultar">Consultar endereço: </label>
						<input id="consultar" value={endereco.toString(16)} onChange={e => setEndereco(Number("0x" + (e.target.value || 0)))} />
						<span>Valor: {cpu.memory[endereco].toString(16)} - {cpu.memory[endereco + 1].toString(16)} - {cpu.memory[endereco + 2].toString(16)}</span>
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
						// onClick={testes}
						onClick={() => loop(1)}
						className="px-4 py-2 bg-green-500 rounded-lg cursor-pointer"
					>
						Próxima instrução
					</button>
				</div>
			</div>
		</>
	)
}

export default App
