// adc op codes
import * as adc_op_codes from "./op_codes/adc";
import * as and_op_codes from "./op_codes/and";

const op_codes = {
    // adc
    "69": adc_op_codes.op_code_69_exec,
    "65": adc_op_codes.op_code_65_exec,
    "75": adc_op_codes.op_code_75_exec,
    "6d": adc_op_codes.op_code_6d_exec,
    "7d": adc_op_codes.op_code_7d_exec,
    "79": adc_op_codes.op_code_79_exec,
    "61": adc_op_codes.op_code_61_exec,
    "71": adc_op_codes.op_code_71_exec,

    // and
    "29": and_op_codes.op_code_29_exec,
    "25": and_op_codes.op_code_25_exec,
    "35": and_op_codes.op_code_35_exec,
    "2d": and_op_codes.op_code_2d_exec,
    "3d": and_op_codes.op_code_3d_exec,
    "39": and_op_codes.op_code_39_exec,
    "21": and_op_codes.op_code_21_exec,
    "31": and_op_codes.op_code_31_exec,
}

export default op_codes;