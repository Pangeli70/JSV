/** -----------------------------------------------------------------------
 * @module [JSV/test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04]
 * -----------------------------------------------------------------------
 */
import { Uts } from '../../deps.ts'
import { IApgJsvEnum, ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../../mod.ts";

enum eApgJsvTestNumericEnum {
    ZERO,
    FIRST,
    SECOND,
    THIRD,
    FIFTH = 5
}
export const eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID = ApgJsv_DOMAIN + "eApgJsvTestEnumNumericSchema";
export const eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID_REF = eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: IApgJsvEnum = {
    $schema: ApgJsv_DIALECT,
    $id: eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "integer",
            enum: Uts.ApgUtsEnum.NumericValues(eApgJsvTestNumericEnum)
        },
    }
}


export const eApgJsv_TEST_ENUM_NUMERIC_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvEnum;