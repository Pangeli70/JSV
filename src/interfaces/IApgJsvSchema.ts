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
import { IApgJsvAjvValidatorSpec } from './IApgJsvAjvValidatorSpec.ts';
import { TApgJsvType, TApgJsvProperties } from "../types/TApgJsvTypes.ts";

/**  
 * Interface for the Basic Json Schemas
 */
export interface IApgJsvSchema {
  /** A reference to the uri JSON Schema */
  $schema: string;
  /** The ID of the schema has the ...# postfix*/
  $id: string;
  /** The type of the object described by the schema*/
  type?: TApgJsvType ;
  /** Title of the the schema */
  title?: string;
  /** The properties of the object described by the schema */
  properties?: TApgJsvProperties;
  /** Object can have additional properties */
  additionalProperties?: boolean;
  /** Whan velidating stop on all errors or only on critical */
  allErrors?: boolean;
  /** The definitions of the sub objects used in the schema */
  definitions?: unknown; 
  /** The names of the properties required and not optional*/
  required?: string[],

  /** */
  dependencies?: unknown;
  /** The specs used to validate the schema */
  specs?: IApgJsvAjvValidatorSpec[];
}



