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
import { IApgJsvSchema } from '../interfaces/IApgJsvSchema.ts';
import { ApgJsv_DOMAIN, ApgJsv_DIALECT } from "../types/TApgJsvTypes.ts";

export const IApgJsv_ENUM_SCHEMA_ID = ApgJsv_DOMAIN + 'IApgJsvEnum';

const rawSchema: IApgJsvSchema = {
  $schema: ApgJsv_DIALECT,
  $id: IApgJsv_ENUM_SCHEMA_ID,
  type: "object",
  $defs: {
    enumTypeDef: {
      type: "object",
      properties: {
        type: {
          enum: ["string", "integer"]
        },
        enum: {
          type: "array",
          items: {
            type: ['string', 'integer']
          },
        }
      },
      required: [
        "type",
        "enum"
      ]
    },
    defsDef: {
      type: "object",
      properties: {
        enumType: {
          $ref: "#/$defs/enumTypeDef"
        }
      },
      required: ["enumType"]
    }
  },
  properties: {
    $schema: {
      type: "string"
    },
    $id: {
      type: "string"
    },
    $defs: {
      $ref: "#/$defs/defsDef"
    }
  },
  additionalProperties: false,
  allErrors: true,
  required: [
    "$schema",
    "$id",
    "$defs",
  ],
};

export const IApgJsv_ENUM_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as IApgJsvSchema;





