/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/11/18] Github Beta
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * -----------------------------------------------------------------------
 */
import { Uts } from "../../deps.ts"
import { IApgJsvInterface } from "../interfaces/IApgJsvInterface.ts";
import { ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../types/TApgJsvTypes.ts";

export const IApgJsv_UTS_SPECABLE_SCHEMA_ID = ApgJsv_DOMAIN + 'IApgJsvUtsSpecable';

const rawSchema: IApgJsvInterface = {
    $schema: ApgJsv_DIALECT,
    $id: IApgJsv_UTS_SPECABLE_SCHEMA_ID,
    type: 'object',
    properties: {
        run: {
            type: 'number',
        },
        when: {
            type: 'string'
        },
        expectMsg: {
            type: 'string'
        },
        expectVal: {
            type: ["boolean", "object", "array", "number", "string"]
        },
        gotMsg: {
            type: 'string'
        },
        gotVal: {
            type: ["boolean", "object", "array", "number", "string"]
        },
        skip: { // optional
            type: 'boolean'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'run',
        'when',
        'expectMsg',
        'expectVal',
        'gotMsg',
        'gotVal',
    ]
};

export const IApgJsv_UTS_SPECABLE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvInterface;