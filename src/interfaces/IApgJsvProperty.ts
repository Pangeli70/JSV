/** -----------------------------------------------------------------------
* @module [JSV]
* @author [APG] ANGELI Paolo Giusto
* @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
* @version 0.9.2 [APG 2022/11/13] Github Beta
* -----------------------------------------------------------------------
*/
import { TApgJsvType } from "../types/TApgJsvTypes.ts";

/**
 * A description for a field (property) of the Json schema
 */
export interface IApgJsvProperty {
  // Type name 
  type?: TApgJsvType;
  // Recursive definition for array types
  items?: IApgJsvProperty;
  // Internal or External reference for complex types
  $ref?: string;
  // Enum values
  enum?: string[];
  // RegExp Pattern
  pattern?: string;
  // Description
  description?: string;
}
