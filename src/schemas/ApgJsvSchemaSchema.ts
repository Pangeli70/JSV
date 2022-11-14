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
import { IApgJsvSchema } from '../interfaces/IApgJsvSchema.ts';

const rawSchema: IApgJsvSchema = {
  $schema: "http://json-schema.org/schema#",
  $id: "IApgJsvSchema",
  type: "object",
  properties: {
    $schema: {
      type: "string"
    },
    $id: {
      type: "string"
    },
    type: {
      type: "string"
    },
    title: {
      type: "string"
    },
    properties: {
      type: "object"
    },
    additionalProperties: {
      type: "boolean"
    },
    allErrors: {
      type: "boolean"
    },
    definitions: {
      type: "object"
    },
    required: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  additionalProperties: true,
  allErrors: true,
  required: [
    "$id", "$schema", "type"
  ]
};

export const ApgJsv_SCHEMA_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvSchema;



