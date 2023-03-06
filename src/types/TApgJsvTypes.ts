/** ---------------------------------------------------------------------
* @module [JSV]
* @author [APG] ANGELI Paolo Giusto
* @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
* @version 0.9.2 [APG 2022/11/13] Github Beta
* @version 0.9.6 [APG 2023/03/04] Total revision
* -----------------------------------------------------------------------
*/

import { IApgJsvProperty } from "../interfaces/IApgJsvProperty.ts";


export type TApgJsvType = "boolean" | "number" | "integer" | "string" | "array" | "object" | "null" | TApgJsvType[];

export type TApgJsvProperties = { [key: string]: IApgJsvProperty; };

export const ApgJsv_DOMAIN = "https://apg-jsv.deno.dev/";

export const ApgJsv_DIALECT = "http://json-schema.org/draft-07/schema#";