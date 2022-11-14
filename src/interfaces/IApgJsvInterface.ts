/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * -----------------------------------------------------------------------
 */
import { TApgJsvProperties } from "../types/TApgJsvTypes.ts";
import { IApgJsvSchema } from './IApgJsvSchema.ts';


/** 
 * Interface for the Json Schemas that manages interfaces
 * Define as non optional the fields already defined in IApJsvSchema
 */
export interface IApgJsvInterface extends IApgJsvSchema {
  properties: TApgJsvProperties;
  additionalProperties: boolean;
  allErrors: boolean;
  required: string[];
}
