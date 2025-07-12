import { useEffect } from "react";
import cpu, { exec_cpu_instruction } from "./core/cpu";
import ppu, { exec_ppu_instruction } from "./core/ppu";
import { _16kb, height, width } from "./utils/constants";

function App() {
	useEffect(() => {
		const screen = document.getElementById("screen") as any;
		const ctx = screen.getContext("2d");

		const scale = 2;
		screen.style.width = (screen.width * scale) + "px";
		screen.style.height = (screen.height * scale) + "px";

		ctx.imageSmoothingEnabled = false;

		const imageData = ctx.createImageData(width, height);
		const pixels = imageData.data;

		function setPixel(x: number, y: number, r: number, g: number, b: number, a = 255) {
			const index = (y * width + x) * 4;
			pixels[index + 0] = r;
			pixels[index + 1] = g;
			pixels[index + 2] = b;
			pixels[index + 3] = a;
		}

		function drawn_pixel(x: number, y: number, r: number, g: number, b: number, a = 255) {
			setPixel(x, y, r, g, b, a);
			ctx.putImageData(imageData, 0, 0);
		}

		function clear_screen() {
			for (let y = 0; y < height; y++)
				for (let x = 0; x < width; x++)
					setPixel(x, y, 0, 0, 0);

			ctx.putImageData(imageData, 0, 0);
		}

		ppu.setScreen({
			clearScreen: clear_screen,
			drawnPixel: drawn_pixel
		});

		ppu.scr?.clearScreen();
	}, []);

	//#region Emulador
	function handleLoadRom(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.onload = event => {
				if (event.target?.result) {
					const rom = new Uint8Array(event.target?.result as ArrayBuffer);
					changeCpuMemory(rom);
					// init();
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

	function exec() {
		exec_cpu_instruction(cpu);
		exec_ppu_instruction(ppu, cpu);
	}

	function loop(cyclesPerFrame: number) {
		for (let cycle = 0; cycle < cyclesPerFrame; cycle++)
			exec();

		requestAnimationFrame(() => loop(cyclesPerFrame));
	}

	function init() {
		const cyclesPerFrame = (1.79 * 1000000) / 60;
		loop(cyclesPerFrame);
	}
	//#endregion

	return (
		<>
			<div className="grid w-screen h-screen place-items-center">
				<div>
					<canvas id="screen" width={width} height={height} style={{ imageRendering: "pixelated" }} />

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
				</div>
			</div>
		</>
	)
}

export default App
