import cpu, { exec_cpu_instruction } from "./core/cpu";
import { _16kb } from "./utils/constants";

function App() {
	let isRunning = false;


	function handleLoadRom(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.onload = event => {
				if (event.target?.result) {
					const rom = new Uint8Array(event.target?.result as ArrayBuffer);
					changeCpuMemory(rom);
					isRunning = true;
					loop();
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

	function loop() {
		// while (isRunning) {
		exec_cpu_instruction(cpu);
		// }
	}

	return (
		<>
			<div className="grid w-screen h-screen place-items-center">
				<button type="button" onClick={() => document.getElementById("load_rom_input")?.click()}>Carregar ROM</button>
				<input id="load_rom_input" className="hidden" type="file" onChange={handleLoadRom} accept=".nes" />
			</div>
		</>
	)
}

export default App
