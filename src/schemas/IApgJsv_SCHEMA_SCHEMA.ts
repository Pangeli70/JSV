/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/11/26]
 * @version 0.8.0 [APG 2022/03/19] Porting to deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * -----------------------------------------------------------------------
 */
import { Uts } from "../../deps.ts"
import { IApgJsvSchema } from '../interfaces/IApgJsvSchema.ts';
import { ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../types/TApgJsvTypes.ts";

export const IApgJsv_SCHEMA_SCHEMA_ID = ApgJsv_DOMAIN + 'IApgJsvSchema'

const rawSchema: IApgJsvSchema = {
  $schema: ApgJsv_DIALECT,
  $id: IApgJsv_SCHEMA_SCHEMA_ID,
  type: "object",
  properties: {
    $schema: {
      type: "string"
    },
    $id: {
      type: "string"
    },
    $defs: {
      type: "object"
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
    "$schema", "$id", "type"
  ]
};

export const IApgJsv_SCHEMA_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvSchema;



