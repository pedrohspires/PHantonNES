import { InstructionType } from "../types/instruction.d"
import { execAddOpCode69 } from "./instructions/add"

export const instructions: InstructionType = {
    0x69: (cpu) => execAddOpCode69(cpu, "immediate")
}