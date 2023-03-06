/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * -----------------------------------------------------------------------
 */
import { TApgJsvType } from "../types/TApgJsvTypes.ts";

/**
 * A description for a field (property) of the Json schema
 */
export interface IApgJsvProperty {
  
  // This is used to describe the meaning of the property
  description?: string;
  
  // Type name
  type?: TApgJsvType;

  // Recursive definition for array types
  items?: IApgJsvProperty;

  // Internal or External reference for complex types
  $ref?: string;

  // The property is defined by enumerated values
  enum?: string[];

  // This property is constant ad must be deeply equal to the passed value
  const?: unknown;


  // Numeric minimum value
  minimum?: number;
  // Numeric maximum value
  maximum?: number;
  // The number must be a multiple of the passed value
  multipleOf?: number


  // String minimum number of characters
  minLenght?: number;
  // String maximum number of characters
  maxLenght?: number;
  // String RegExp Pattern
  pattern?: string;


  // Array minimum number of items
  minItems?: number;
  // Array maximum number of items
  maxItems?: number;
  // All items in array must be unique
  uniqueItems?: boolean

}
