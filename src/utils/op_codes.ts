// adc op codes
import * as adc_op_codes from "./op_codes/adc";
import * as and_op_codes from "./op_codes/and";
import * as lda_op_codes from "./op_codes/lda";
import * as ldx_op_codes from "./op_codes/ldx";
import * as ldy_op_codes from "./op_codes/ldy";
import * as sta_op_codes from "./op_codes/sta";
import * as stx_op_codes from "./op_codes/stx";
import * as sty_op_codes from "./op_codes/sty";

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

    // lda
    "a9": lda_op_codes.op_code_a9_exec,
    "a5": lda_op_codes.op_code_a5_exec,
    "b5": lda_op_codes.op_code_b5_exec,
    "ad": lda_op_codes.op_code_ad_exec,
    "bd": lda_op_codes.op_code_bd_exec,
    "b9": lda_op_codes.op_code_b9_exec,
    "a1": lda_op_codes.op_code_a1_exec,
    "b1": lda_op_codes.op_code_b1_exec,

    // ldx
    "a2": ldx_op_codes.op_code_a2_exec,
    "a6": ldx_op_codes.op_code_a6_exec,
    "b6": ldx_op_codes.op_code_b6_exec,
    "ae": ldx_op_codes.op_code_ae_exec,
    "be": ldx_op_codes.op_code_be_exec,

    // ldy
    "a0": ldy_op_codes.op_code_a0_exec,
    "a4": ldy_op_codes.op_code_a4_exec,
    "b4": ldy_op_codes.op_code_b4_exec,
    "ac": ldy_op_codes.op_code_ac_exec,
    "bc": ldy_op_codes.op_code_bc_exec,

    // sta
    "85": sta_op_codes.op_code_85_exec,
    "95": sta_op_codes.op_code_95_exec,
    "8d": sta_op_codes.op_code_8d_exec,
    "9d": sta_op_codes.op_code_9d_exec,
    "99": sta_op_codes.op_code_99_exec,
    "81": sta_op_codes.op_code_81_exec,
    "91": sta_op_codes.op_code_91_exec,

    // stx
    "86": stx_op_codes.op_code_86_exec,
    "96": stx_op_codes.op_code_96_exec,
    "8e": stx_op_codes.op_code_8e_exec,

    // sty
    "84": sty_op_codes.op_code_84_exec,
    "94": sty_op_codes.op_code_94_exec,
    "8c": sty_op_codes.op_code_8c_exec,
}

export default op_codes;