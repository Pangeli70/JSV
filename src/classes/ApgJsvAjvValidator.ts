/** ----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.0 [APG 2018/11/24]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.5 [APG 2023/02/15] Rst Simplification
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
  /** Function created by Ajv after the compilation of the schema */
  validateFn: AjvValidateFn | undefined;
  /** Errors detected during the validation */
  errors: AjvError[];
  /** Current status of the object */
  status: Rst.IApgRst;


  constructor(aschemaName: string, aschemaDependencies: any[]) {

    this.errors = [];
    this.schemaName = aschemaName;
    this.status = { ok: true };

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
      this.status = Rst.ApgRstErrors.Coded(
        eApgJsvCodedErrors.JSV_Ajv_Not_Valid_Params_2,
        [this.schemaName],
      );
      const p: Rst.IApgRstPayload = { signature: 'string', data: e.message };
      this.status.payload = p;
    }
  }


  /** @payload IApgJsvAjvResult */
  validate(aobj: unknown){

    if (!this.status.ok) {
      return this.status;
    }

    let r: Rst.IApgRst = { ok: true };

    if (!this.validateFn) {
      r = Rst.ApgRstErrors.Coded(
        eApgJsvCodedErrors.JSV_Ajv_Not_Initialized_1,
        [this.schemaName]
      );
    }
    else {

      const valid = this.#tryValidate(aobj);
      if (!valid) {
        r = Rst.ApgRstErrors.Coded(
          eApgJsvCodedErrors.JSV_Ajv_Not_A_Valid_Object_1,
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
      r.payload = p;
    }
    return r;

  }


  #tryValidate(aobj: unknown) {

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

