/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/11/26]
 * @version 0.8.0 [APG 2022/03/19] Porting to deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
  * -----------------------------------------------------------------------
 */
import { Uts } from "../../deps.ts"
import { IApgJsvInterface } from "../interfaces/IApgJsvInterface.ts";


const rawSchema: IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgJsvAjvValidatorSpec#',
    type: 'object',
    properties: {
        skip: {
            type: 'boolean'
        },
        verbose: {
            type: 'boolean'
        },
        properties: {
            type: 'boolean'
        },
        it: {
            type: 'string'
        },
        expected: {
            type: 'boolean'
        },
        error: {
            type: 'string'
        },
        keyword: {
            type: 'string'
        },
        object: {
            type: 'object'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'skip',
        'verbose',
        'properties',
        'it',
        'expected',
        'error',
        'keyword',
        'object'
    ]
};

export const ApgJsv_AJV_VALIDATOR_SPECS_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvInterface;