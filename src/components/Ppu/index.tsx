
type PropsPpu = {
    readCpuMemory: (address: number) => void,
    writeCpuMemory: (address: number, content: number) => void
}

export default function Ppu({ }: PropsPpu) {
    return (
        <div>Ppu</div>
    )
}
