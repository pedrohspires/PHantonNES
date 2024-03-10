type PropsUsePpu = {
    readCpuMemory: (address: number) => void,
    writeCpuMemory: (address: number, content: number) => void
}

export default function usePpu({ readCpuMemory, writeCpuMemory }: PropsUsePpu) {

}