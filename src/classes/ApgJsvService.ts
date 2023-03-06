/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.4.0 [APG 2018/10/16]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.0 [APG 2022/08/16] New JVal and Json schema files removal
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.5 [APG 2023/02/15] Rst Simplification
 * @version 0.9.6 [APG 2023/03/05] Removed coded errors + Total revision
 * -----------------------------------------------------------------------
 */
import { StdPath, Rst, Uts, Lgr } from '../../deps.ts';

import { ApgJsvAjvValidator } from "./ApgJsvAjvValidator.ts";

import { IApgJsvAjvValidatorSpec } from "../interfaces/IApgJsvAjvValidatorSpec.ts";
import { IApgJsvAjvValidatorSpecError } from "../interfaces/IApgJsvAjvValidatorSpecError.ts";
import { IApgJsvSchema } from '../interfaces/IApgJsvSchema.ts';

import { IApgJsv_ENUM_SCHEMA } from '../schemas/IApgJsv_ENUM_SCHEMA.ts';
import { IApgJsv_INTERFACE_SCHEMA } from '../schemas/IApgJsv_INTERFACE_SCHEMA.ts';
import { IApgJsvAjvResult } from "../interfaces/IApgJsvAjvResult.ts";


/** 
 * Json Schema Manager  
 */
export class ApgJsvService extends Uts.ApgUtsMeta {

  private readonly _SCHEMA_SPEC_VALIDATOR = 'IApgJsvValidatorSpec';

  private _loggable: Lgr.ApgLgrLoggable

  private readonly _INTERF_VALIDATOR: ApgJsvAjvValidator;
  private readonly _ENUM_VALIDATOR: ApgJsvAjvValidator;

  private _schemas: Map<string, IApgJsvSchema> = new Map();
  private _validators: Map<string, ApgJsvAjvValidator> = new Map();

  private _validatorsSpecs: Map<string, IApgJsvAjvValidatorSpec[]> = new Map();
  private _validatorsSpecsPaths: Map<string, string> = new Map();


  constructor(alogger: Lgr.ApgLgr) {

    super(import.meta.url)
    this._loggable = new Lgr.ApgLgrLoggable(this.CLASS_NAME, alogger);

    const intfSchemaName = IApgJsv_INTERFACE_SCHEMA.$id.replaceAll("#", "");
    this._schemas.set(intfSchemaName, IApgJsv_INTERFACE_SCHEMA);
    this._INTERF_VALIDATOR = new ApgJsvAjvValidator(intfSchemaName, [IApgJsv_INTERFACE_SCHEMA]);

    const enumSchemaName = IApgJsv_ENUM_SCHEMA.$id.replaceAll("#", "");
    this._schemas.set(enumSchemaName, IApgJsv_ENUM_SCHEMA);
    this._ENUM_VALIDATOR = new ApgJsvAjvValidator(enumSchemaName, [IApgJsv_ENUM_SCHEMA]);

  }


  addValidator(aschema: IApgJsvSchema, adependencies: string[]) {

    let r: Rst.IApgRst = { ok: true };
    r.payload = { signature: 'string', data: aschema.$id };
    this._loggable.logBegin(this.addValidator.name, r);

    const schemaName = aschema.$id;
    const isEnum = (aschema.$defs && (aschema.$defs as any)!.enumType != undefined);
    const schemaValidator = isEnum ? this._ENUM_VALIDATOR! : this._INTERF_VALIDATOR!;
    const schemaType = isEnum ? "Enumeration" : "Interface";

    r = schemaValidator.validate(aschema);
    if (!r.ok) {
      const m = Rst.ApgRst.InterpolateMessage(r);
      const f = `The schema [${schemaName}] is not a valid JSV ${schemaType}: `
      const p = Rst.ApgRst.ExtractPayload(r, "IApgJsvAjvResult") as IApgJsvAjvResult;
      const message = m + f + " / " + p.details;
      r.message = message;
      r.params = undefined;
    }

    const dependencies: IApgJsvSchema[] = [];
    const schemas: IApgJsvSchema[] = [];

    if (r.ok) {
      dependencies.push(...this.#getSchemas(adependencies));
      r.ok = dependencies.length === adependencies.length;
      if (!r.ok) {
        r.message += `Some dependencies not found for schema [${schemaName}]:${adependencies.toString()})`
      }
    }

    if (r.ok) {
      schemas.push(aschema);
      schemas.push(...dependencies);
      const validator = new ApgJsvAjvValidator(schemaName, schemas);
      r = validator.status;


      if (r.ok) {
        this._schemas.set(schemaName, aschema);
        this._validators.set(schemaName, validator);
        const payload: Rst.IApgRstPayload = {
          signature: "ApgJsvAjvValidator",
          data: validator
        };
        r.payload = payload
      }
    }

    this._loggable.logEnd();
    return r;
  }


  #getSchemas(aschemaNames: string[]) {
    const r: IApgJsvSchema[] = [];
    for (let i = 0; i < aschemaNames.length; i++) {
      const schema = this._schemas.get(aschemaNames[i]);
      if (schema) {
        r.push(schema);
      }
    }
    return r;
  }


  /** @payload IApgAjvResult */
  validate(aschemaName: string, aobj: unknown) {

    let r: Rst.IApgRst = { ok: true };

    const validator = this._validators.get(aschemaName);

    if (!validator) {
      r = Rst.ApgRstErrors.Parametrized(
        'The schema [%1] is not present in the current set of validators',
        [aschemaName]
      );
    }
    else {
      r = validator!.validate(aobj);
    }
    return r;
  }


  getValidator(aschemaName: string) {
    return this._validators.get(aschemaName);
  }

  //#region  Specs ---------------------------------------------------------------

  // TODO @9 Move this stuff in its own class -- APG 20230305

  /** @payload string[]: Re-Loaded spec files*/
  async loadSchemaSpecs(aspecsPath: string) {

    let r: Rst.IApgRst = { ok: true };
    r.payload = { signature: 'path', data: aspecsPath };
    this._loggable.logBegin(this.loadSchemaSpecs.name, r)

    let specFiles: string[] = [];
    r = { ok: true };
    const validator = this._validators.get(this._SCHEMA_SPEC_VALIDATOR);

    r = await this.#loadSchemaSpecsInFolder(aspecsPath, validator!);

    if (r.ok) {
      specFiles = Rst.ApgRst.ExtractPayload(r, "string[]") as string[];
      const message = `Loaded successfully ${specFiles.length} schema spec files from folder ${aspecsPath}`;
      const payload: Rst.IApgRstPayload = { signature: 'string[]', data: specFiles };
      r = { ok: true, message, payload }
    }

    this._loggable.logEnd(r);
    return r;
  }


  /** 
   * @payload OK: string[]: Loaded spec files
   * @payload KO: IApgAjvValidatorSpecError[]: validation errors
  */
  async #loadSchemaSpecsInFolder(
    apath: string,
    avalidator: ApgJsvAjvValidator,
  ) {
    let r: Rst.IApgRst = { ok: true };
    r.payload = { signature: 'path', data: apath };
    this._loggable.logBegin(this.#loadSchemaSpecsInFolder.name, r);

    const errors: IApgJsvAjvValidatorSpecError[] = [];
    const files: string[] = [];
    r = { ok: true };

    if (!Uts.ApgUtsFs.FolderExistsSync(apath)) {
      r = Rst.ApgRstErrors.Parametrized(
        'Schema Specs folder [%1] not found',
        [apath]
      );
    }
    else {
      const specFiles: string[] = Uts.ApgUtsFs.GetFileNamesSortedSync(apath);

      for (const fileName of specFiles) {

        if (r.ok) {
          const frg: string[] = fileName.split('.');
          const file = StdPath.join(apath, fileName);

          r = await this.#loadSpecs(frg[0], file, avalidator, errors);
          files.push(file);
        }
      }
    }

    if (r.ok) {
      const p: Rst.IApgRstPayload = { signature: 'string[]', data: files };
      r.payload = p;
    }

    this._loggable.logEnd(r);
    return r;
  }


  /** @payload nothing | IApgJsonFileResult | IApgAjvResult */
  async #loadSpecs(
    aname: string,
    afile: string,
    avalidator: ApgJsvAjvValidator,
    aerrors: IApgJsvAjvValidatorSpecError[]
  ) {

    this._loggable.logBegin(this.#loadSpecs.name);

    const rawData = await Deno.readTextFile(afile);

    const data = <IApgJsvAjvValidatorSpec[]>JSON.parse(rawData);
    const specs: IApgJsvAjvValidatorSpec[] = [];

    let r: Rst.IApgRst = { ok: true };

    let i = 0;
    data.forEach(element => {
      if (r.ok) {
        r = avalidator.validate(element);

        if (!r.ok) {
          const p: Rst.IApgRstPayload = { signature: 'string', data: afile };
          r.payload = p;
          aerrors.push({
            file: afile,
            failed: i
          });
        }
        else {
          specs.push(element);
        }
      }
      i++;
    });

    if (r.ok) {
      this._validatorsSpecs.set(aname, specs);
      this._validatorsSpecsPaths.set(aname, afile);
    }

    this._loggable.logEnd(r);
    return r;
  }


  /** @pApgResult | IApgJsonFileResult | IApgAjvResult */
  async reloadSpecs(
    aname: string,
    avalidator: ApgJsvAjvValidator,
    aerrors: IApgJsvAjvValidatorSpecError[]
  ) {

    this._loggable.logBegin(this.reloadSpecs.name);
    let r: Rst.IApgRst = { ok: true };

    const cpath = this._validatorsSpecsPaths.get(aname);
    if (!cpath) {
      r = Rst.ApgRstErrors.Parametrized(
        'The schema [%1] is not present in the current set of validators',
        [aname]
      );
    }
    else {
      r = await this.#loadSpecs(aname, cpath, avalidator, aerrors);
    }

    this._loggable.logEnd(r);
    return r;
  }

  //#endregion


}
