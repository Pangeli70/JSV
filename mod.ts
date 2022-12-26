/** -----------------------------------------------------------------------
 * @module [JSV] Json Schema Validation
 * @author [APG] ANGELI Paolo Giusto
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

export { ApgJsv_SCHEMA_SCHEMA } from "./src/schemas/ApgJsvSchemaSchema.ts";
export { ApgJsv_ENUM_SCHEMA } from "./src/schemas/ApgJsvEnumSchema.ts";
export { ApgJsv_INTERFACE_SCHEMA } from "./src/schemas/ApgJsvInterfaceSchema.ts";
export { ApgJsv_UTS_SPECABLE_SCHEMA } from "./src/schemas/ApgJsv_UtsSpecableSchema.ts";

export { ApgJsvService } from "./src/classes/ApgJsvService.ts"
export { eApgJsvCodedErrors } from "./src/enums/eApgJsvCodedErrors.ts";
