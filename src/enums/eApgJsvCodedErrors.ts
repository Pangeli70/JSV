/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.4.0 [APG 2018/10/29]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * -----------------------------------------------------------------------
 */

export enum eApgJsvCodedErrors {

  /** Error in costructor of Ajv for [%1] json schema. Check payload for further details */
  JSV_Ajv_Not_Valid_Params_2 = '[JSV] AJV_NOT_VALID_PARAMS',
  /** Ajv for [%1] json schema not initialized properly */
  JSV_Ajv_Not_Initialized_1 = '[JSV] AJV_NOT_INITIALIZED',
  /** Ajv validation failed: the object doesn't match the [%1] json schema. Check payload for further details */
  JSV_Ajv_Not_A_Valid_Object_1 = '[JSV] AJV_NOT_A_VALID_OBJECT',

  /** */
  JSV_Schema_Invalid_2 = '[SCHEMAS] INVALIDPARAMS_2',

  /** The schema [%1] is not present in the current set of validators */
  JSV_Schema_NotFound_1 = '[SCHEMAS] NOT_FOUND_1',

  /** The spec with index [%1] is not preset in the list of schema [%2]. */
  JSV_Schema_Spec_Ind_NotFound_2 = '[SCHEMAS] SPEC_IND_NOT_FOUND_2',

  /** Schema file [%1] not found */
  JSV_Schema_File_NotFound_1 = '[SCHEMAS] FILE_NOTFOUND',

  /** Schema Specs folder [%1] not found */
  JSV_Schema_Spec_Folder_NotFound_1 = '[SCHEMAS] SPEC_FOLDER_NOTFOUND',

  /** Error building validator for schema [%1] */
  JSV_Schema_Ajv_CreationError_1 = '[SCHEMAS] AJV_CREATIONERROR',

  /** Dependencies for validator of schema [%1] not found */
  JSV_Schema_Dependencies_NotFound_1 = '[SCHEMAS] DEPENDENCIES_NOTFOUND',

}
