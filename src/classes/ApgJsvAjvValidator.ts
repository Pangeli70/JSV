/** ----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.0 [APG 2018/11/24]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * -----------------------------------------------------------------------
*/
import { Ajv, AjvError, AjvValidateFn, Rst } from '../../deps.ts'
import { eApgJsvCodedErrors } from "../enums/eApgJsvCodedErrors.ts";
import { IApgJsvAjvResult } from '../interfaces/IApgJsvAjvResult.ts'


/**
 *  Apg Ajv wrapper implementation
 */
export class ApgJsvAjvValidator {

  /** Validator's schema name */
  schemaName: string;
  /** Function created by Ajv compilation of the schema */
  validateFn: AjvValidateFn | undefined;
  /** Errors detected during the validation */
  errors: AjvError[];
  /** Current status of the object */
  status: Rst.ApgRst;


  constructor(aschemaName: string, aschemaDependencies: any[]) {
    this.errors = [];
    this.schemaName = aschemaName;
    this.status = new Rst.ApgRst();
    const ajv = new Ajv.default({ strict: false });
    try {
      if (aschemaDependencies.length > 1) {
        ajv.addSchema(aschemaDependencies);
        this.validateFn = ajv.getSchema(aschemaDependencies[0].$id);
      }
      else {
        this.validateFn = ajv.compile(aschemaDependencies[0]);
      }
    } catch (e) {
      this.status = Rst.ApgRstErrors.NotAValidObject(
        eApgJsvCodedErrors.JSV_Ajv_Not_Valid_Params_2,
        undefined,
        [this.schemaName],
      );
      const p: Rst.IApgRstPayload = { signature: 'string', data: e.message };
      this.status.setPayload(p);
    }
  }


  /** @payload IApgJsvAjvResult */
  validate(aobj: unknown): Rst.ApgRst {

    if (!this.status.Ok) {
      return this.status;
    }

    let r = new Rst.ApgRst();

    if (!this.validateFn) {
      r = Rst.ApgRstErrors.NotInitialized(
        eApgJsvCodedErrors.JSV_Ajv_Not_Initialized_1,
        undefined,
        [this.schemaName]
      );
    }
    else {

      const valid = this.#validate(aobj);
      if (!valid) {
        r = Rst.ApgRstErrors.NotAValidObject(
          eApgJsvCodedErrors.JSV_Ajv_Not_A_Valid_Object_1,
          undefined,
          [this.schemaName]
        );
      }

      const p: Rst.IApgRstPayload = {
        signature: 'IApgJsvAjvResult',
        data: <IApgJsvAjvResult>{
          validated: aobj,
          errors: this.errors
        }
      }
      r.setPayload(p);
    }
    return r;

  }


  #validate(aobj: unknown): boolean {

    this.errors = [];

    let r = false;

    if (!this.validateFn) {
      return r;
    }

    r = <boolean>this.validateFn(aobj);

    if (!r && this.validateFn.errors && this.validateFn.errors.length > 0) {

      this.errors = [...this.validateFn.errors];
      this.validateFn.errors = [];

    }

    return r;
  }

}

