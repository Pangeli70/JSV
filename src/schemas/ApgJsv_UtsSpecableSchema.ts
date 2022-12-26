/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/11/18] Github Beta
  * -----------------------------------------------------------------------
 */
import { Uts } from "../../deps.ts"
import { IApgJsvInterface } from "../interfaces/IApgJsvInterface.ts";


const rawSchema: IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgJsvUtsSpecable#',
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

export const ApgJsv_UTS_SPECABLE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvInterface;