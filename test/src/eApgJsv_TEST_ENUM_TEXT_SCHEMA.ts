/** -----------------------------------------------------------------------
 * @module [JSV/test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04]
 * -----------------------------------------------------------------------
 */
import { Uts } from '../../deps.ts'
import { IApgJsvEnum, ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../../mod.ts";

enum eApgJsvTestStringEnum {
    ZERO = "zero",
    FIRST = 'first',
    SECOND = 'second',
    THIRD = 'third',
    FIFTH = 'fifth'
}
export const eApgJsv_TEST_ENUM_STRING_SCHEMA_ID =
    ApgJsv_DOMAIN + "eApgJsvTestEnumStringSchema";
export const eApgJsv_TEST_ENUM_STRING_SCHEMA_ID_REF =
    eApgJsv_TEST_ENUM_STRING_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: IApgJsvEnum = {
    $schema: ApgJsv_DIALECT,
    $id: eApgJsv_TEST_ENUM_STRING_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "string",
            enum: Uts.ApgUtsEnum.StringValues(eApgJsvTestStringEnum)
        },
    }
}


export const eApgJsv_TEST_ENUM_STRING_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvEnum;