/** ---------------------------------------------------------------------
* @module [JSV]
* @author [APG] ANGELI Paolo Giusto
* @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
* @version 0.9.2 [APG 2022/11/13] Github Beta
* -----------------------------------------------------------------------
*/

import { IApgJsvProperty } from "../interfaces/IApgJsvProperty.ts";


export type TApgJsvType = "boolean" | "number" | "integer" | "string" | "array" | "object" | "null" | string[];

export type TApgJsvProperties = { [key: string]: IApgJsvProperty; };

export type TApgJsvSchemaPropNames =
    "$schema" |
    "$id" |
    "type" |
    "title ?" |
    "properties ?" |
    "additionalProperties ?" |
    "allErrors ?" |
    "definitions ?" |
    "required ?";
