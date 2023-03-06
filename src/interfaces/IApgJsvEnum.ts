/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/10/20]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * -----------------------------------------------------------------------
 */

import { IApgJsvSchema } from "./IApgJsvSchema.ts";

export interface IApgJsvEnumTypeDefinition {
  type: "string" | "integer";
  enum: string[] | number[];
}


export interface IApgJsvEnumDefinition {
  enumType: IApgJsvEnumTypeDefinition;
}


/** Interface for the Json Schemas that manages Enums
 * Define as non optional the fields already defined in IApgJValSchema
 */
export interface IApgJsvEnum extends IApgJsvSchema {

  $defs: IApgJsvEnumDefinition;
}
