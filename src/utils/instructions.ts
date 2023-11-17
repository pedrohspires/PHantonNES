// adc op codes
import {
    op_code_61_exec,
    op_code_65_exec,
    op_code_69_exec,
    op_code_6d_exec,
    op_code_71_exec,
    op_code_75_exec,
    op_code_79_exec,
    op_code_7d_exec
} from "./op_codes/adc";

const instructions = {
    "69": op_code_69_exec,
    "65": op_code_65_exec,
    "75": op_code_75_exec,
    "6d": op_code_6d_exec,
    "7d": op_code_7d_exec,
    "79": op_code_79_exec,
    "61": op_code_61_exec,
    "71": op_code_71_exec,
}

export default instructions;