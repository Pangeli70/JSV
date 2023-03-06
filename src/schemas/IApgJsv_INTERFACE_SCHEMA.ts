/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * -----------------------------------------------------------------------
 */
import { Uts } from '../../deps.ts';
import { IApgJsvInterface } from '../interfaces/IApgJsvInterface.ts';
import { ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../types/TApgJsvTypes.ts";

export const IApgJsv_INTERFACE_SCHEMA_ID = ApgJsv_DOMAIN + 'IApgJsvInterface'

const rawSchema: IApgJsvInterface = {
  $schema: ApgJsv_DIALECT,
  $id: IApgJsv_INTERFACE_SCHEMA_ID,
  $defs: {
    type: "object"
  },
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
    "$schema",
    "$id",
    "type",
    "properties",
    "additionalProperties",
    "allErrors",
    "required"
  ]
};

export const IApgJsv_INTERFACE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvInterface;



