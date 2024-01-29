import Debug from "./components/Debug";
import { CpuContextProvider } from "./context/cpuContext";
import useCpu from "./hooks/useCpu";

function Emulador() {
    const [cpu, init] = useCpu();

    const handleRomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = event => {
                if (event.target?.result) {
                    const rom = new Uint8Array(event.target?.result as ArrayBuffer);
                    init(rom);
                }
            }

            reader.readAsArrayBuffer(event.target.files[0]);
        }
    }

    return (
        <CpuContextProvider value={cpu}>
            <div className="flex justify-between">
                <input type="file" onChange={handleRomSelect} accept=".nes" />
                <button onClick={() => init(new Uint8Array())}>Executr</button>
            </div>

            <div className="w-full h-full bg-sky-900 absolute flex justify-center items-center">
                <Debug />
            </div>
        </CpuContextProvider>
    )
}

export default Emulador;
