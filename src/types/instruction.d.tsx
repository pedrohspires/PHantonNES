import { cpuType } from "./cpu.d"

export type InstructionType = {
    [key: number]: (cpu: cpuType) => void
}