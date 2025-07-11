export type cpuType = {
    a: number;
    x: number;
    y: number;
    pc: number;
    sp: number;
    p: number;
    clk: number;
    memory: Array<number>;

    /**
     * Busca um número na memória através de um endereço fornecido ou do PC. 
     * - +1 ao PC se não fornecer memory_address.
     * 
     * @param memory_address Endereço para buscar dados na memória. Opcional, caso seja fornecido, 
     *                       retorna o valor no endereço fornecido, caso contrário, retorna o valor indicado por PC;
     * @returns Retorna o número contido na memória
     */
    getByteMemory: (memory_address?: number, signed?: boolean) => number;

    /**
     * Busca um número na memória através de um endereço fornecido ou do PC. 
     * - +1 ao PC se não fornecer memory_address.
     * 
     * @param memory_address Endereço para buscar dados na memória. Opcional, caso seja fornecido, 
     *                       retorna o valor no endereço fornecido, caso contrário, retorna o valor indicado por PC;
     * @returns Retorna o número contido na memória
     */
    setByteMemory: (memory_address: number, memory_value: number) => void;

    /**
     * Retorna o OP Code da próxima instrução. Ex: 0x69 => ADC Immediate
     * - Sempre adiciona um ciclo na CPU
     * 
     * @returns Número referente ao OP Code
     */
    getOpCode: () => number;

    /**
     * Busca um endereço formado através do address_mode.
     * - Immediate: +2 ciclo e +2 bytes
     * - Zero Page: +3 ciclos e +2 bytes
     * - Zero Page,X: +4 ciclos e +2 bytes
     * - Zero Page,Y: +4 ciclos e +2 bytes
     * - Absolute: +4 ciclos e +3 bytes
     * - Absolute,X: +4 ciclos (+1 se Page Crossed) e +3 bytes
     * - Absolute,Y: +4 ciclos (+1 se Page Crossed) e +3 bytes
     * - (Indirect,X): +6 ciclos e +2 bytes
     * - (Indirect),Y: +5 ciclos (+1 se Page Crossed) e +2 bytes
     * 
     * @param address_mode Modo do endereçamento da instrução.
     * @returns Valor na memória no endereço formado.
     */
    addressModeResolve: (address_mode: addressModeType, ignorePageCrossed?: boolean) => number;

    setCarryFlag: () => void;
    setZeroFlag: () => void;
    setInterruptFlag: () => void;
    setDecimalFlag: () => void;
    setBreakFlag: () => void;
    setOverflowFlag: () => void;
    setNegativeFlag: () => void;

    clearCarryFlag: () => void;
    clearZeroFlag: () => void;
    clearInterruptFlag: () => void;
    clearDecimalFlag: () => void;
    clearBreakFlag: () => void;
    clearOverflowFlag: () => void;
    clearNegativeFlag: () => void;

    pushStack: (value: number) => void;
    pullStack: () => number;
}

export type addressModeType =
    "immediate" | "zero_page" | "zero_page_x" |
    "zero_page_y" | "absolute" | "absolute_x" |
    "absolute_y" | "indirect_x" | "indirect_y" |
    "accumulator" | "relative" | "indirect";