import { createContext } from "react";
import { cpuType } from "../types/cpu.d";

const cpuContext = createContext<cpuType | null>(null);

export const CpuContextProvider = cpuContext.Provider;
export default cpuContext;