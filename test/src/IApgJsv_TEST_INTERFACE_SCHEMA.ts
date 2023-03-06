/** -----------------------------------------------------------------------
 * @module [JSV/test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04]
 * -----------------------------------------------------------------------
 */
import { Uts } from '../../deps.ts'
import { ApgJsv_DOMAIN, ApgJsv_DIALECT, IApgJsvInterface } from "../../mod.ts";
import { eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID_REF } from "./eApgJsv_TEST_ENUM_NUMERIC_SCHEMA.ts";
import { eApgJsv_TEST_ENUM_STRING_SCHEMA_ID_REF } from "./eApgJsv_TEST_ENUM_TEXT_SCHEMA.ts";

export const IApgJsv_TEST_INTERFACE_SCHEMA_ID = ApgJsv_DOMAIN + 'IApgJsvTestInterfaceSchema';

const rawSchema: IApgJsvInterface = {
    $schema: ApgJsv_DIALECT,
    $id: IApgJsv_TEST_INTERFACE_SCHEMA_ID,
    type: 'object',
    properties: {
        mandatory: {
            type: "string"
        },
        optional: {
            type: "boolean"
        },
        numEnum: {
            $ref: eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID_REF
        },
        stringEnum: {
            $ref: eApgJsv_TEST_ENUM_STRING_SCHEMA_ID_REF
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'mandatory', 'numEnum', "stringEnum"
    ]

};

export const IApgJsv_TEST_INTERFACE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvInterface;