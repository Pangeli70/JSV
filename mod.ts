/** -----------------------------------------------------------------------
 * @module [JSV] Json Schema Validation
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04] Total revision
 * @version 0.9.6 [APG 2023/03/26] Debuggin circular dependency JSON conversion
 * ------------------------------------------------------------------------
 */

export type { IApgJsvAjvResult } from "./src/interfaces/IApgJsvAjvResult.ts";
export type { IApgJsvAjvValidatorSpec } from "./src/interfaces/IApgJsvAjvValidatorSpec.ts";
export type { IApgJsvAjvValidatorSpecError } from "./src/interfaces/IApgJsvAjvValidatorSpecError.ts";

export { ApgJsvAjvValidator } from "./src/classes/ApgJsvAjvValidator.ts";

export type {
    IApgJsvEnum,
    IApgJsvEnumDefinition,
    IApgJsvEnumTypeDefinition
} from "./src/interfaces/IApgJsvEnum.ts";

export type { IApgJsvInterface } from "./src/interfaces/IApgJsvInterface.ts";
export type { IApgJsvSchema } from "./src/interfaces/IApgJsvSchema.ts";
export type { IApgJsvFindResult } from "./src/interfaces/IApgJsvFindResult.ts";

export { IApgJsv_SCHEMA_SCHEMA, IApgJsv_SCHEMA_SCHEMA_ID } from "./src/schemas/IApgJsv_SCHEMA_SCHEMA.ts";
export { IApgJsv_ENUM_SCHEMA, IApgJsv_ENUM_SCHEMA_ID } from "./src/schemas/IApgJsv_ENUM_SCHEMA.ts";
export { IApgJsv_INTERFACE_SCHEMA, IApgJsv_INTERFACE_SCHEMA_ID } from "./src/schemas/IApgJsv_INTERFACE_SCHEMA.ts";
export { IApgJsv_UTS_SPECABLE_SCHEMA, IApgJsv_UTS_SPECABLE_SCHEMA_ID } from "./src/schemas/IApgJsv_UTS_SPECABLE_SCHEMA.ts";

export { ApgJsvService } from "./src/classes/ApgJsvService.ts"

export { ApgJsv_DOMAIN, ApgJsv_DIALECT } from "./src/types/TApgJsvTypes.ts"