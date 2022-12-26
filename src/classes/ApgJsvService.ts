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
 * -----------------------------------------------------------------------
 */
import { StdPath, Rst, Uts, Lgr } from '../../deps.ts';

import { ApgJsvAjvValidator } from "./ApgJsvAjvValidator.ts";

import { IApgJsvAjvValidatorSpec } from "../interfaces/IApgJsvAjvValidatorSpec.ts";
import { IApgJsvAjvValidatorSpecError } from "../interfaces/IApgJsvAjvValidatorSpecError.ts";
import { IApgJsvSchema } from '../interfaces/IApgJsvSchema.ts';

import { eApgJsvCodedErrors } from '../enums/eApgJsvCodedErrors.ts';

import { ApgJsv_ENUM_SCHEMA } from '../schemas/ApgJsvEnumSchema.ts';
import { ApgJsv_INTERFACE_SCHEMA } from '../schemas/ApgJsvInterfaceSchema.ts';


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


  validatorsSpecs: Map<string, IApgJsvAjvValidatorSpec[]> = new Map();
  validatorsSpecsPaths: Map<string, string> = new Map();

  get Schemas() {
    const r = Uts.ApgUtsMap.ToArray(this._schemas);
    return r;
  }

  constructor(alogger: Lgr.ApgLgr) {
    super(import.meta.url)
    this._loggable = new Lgr.ApgLgrLoggable(this.CLASS_NAME, alogger);

    const intfSchemaName = ApgJsv_INTERFACE_SCHEMA.$id.replaceAll("#", "");
    this._schemas.set(intfSchemaName, ApgJsv_INTERFACE_SCHEMA);
    this._INTERF_VALIDATOR = new ApgJsvAjvValidator(intfSchemaName, [ApgJsv_INTERFACE_SCHEMA]);

    const enumSchemaName = ApgJsv_ENUM_SCHEMA.$id.replaceAll("#", "");
    this._schemas.set(enumSchemaName, ApgJsv_ENUM_SCHEMA);
    this._ENUM_VALIDATOR = new ApgJsvAjvValidator(enumSchemaName, [ApgJsv_ENUM_SCHEMA]);

  }



  addValidator(aschema: IApgJsvSchema, aschemaDependencies: string[]) {
    let r = new Rst.ApgRst();
    r.setPayload(new Rst.ApgRstPayload('string', aschema.$id));
    this._loggable.logBegin(this.addValidator.name, r);

    const schemaName = aschema.$id.replaceAll("#", "");
    const schemaValidator = (schemaName[0] === "e") ?
      this._ENUM_VALIDATOR! :
      this._INTERF_VALIDATOR!;

    r = schemaValidator.validate(aschema);
    Rst.ApgRstAssert.IsNotOk(r, `${this.addValidator.name}`)

    const schemas: IApgJsvSchema[] = this.#getSchemasFromDependencies(aschemaDependencies);
    Rst.ApgRstAssert.IsFalse(
      (schemas.length === aschemaDependencies.length),
      `${this.addValidator.name}: Some dependencies not found for ${schemaName}:${aschemaDependencies.toString()})`
    );

    schemas.unshift(aschema);

    const validator = new ApgJsvAjvValidator(schemaName, schemas);
    Rst.ApgRstAssert.IsNotOk(
      validator.status,
      `The status of the validator ${this.addValidator.name} not valid: ${validator.status.AsIApgRst.message} `
    );

    this._schemas.set(schemaName, aschema);
    schemas.push(aschema);
    this._validators.set(schemaName, validator);
    const payload = new Rst.ApgRstPayload("ApgJsvAjvValidator", validator)
    r.setPayload(payload)
    this._loggable.logEnd();
    return r;
  }

  #getSchemasFromDependencies(aschemaNames: string[]) {
    const r: IApgJsvSchema[] = [];
    for (let i = 0; i < aschemaNames.length; i++) {
      const schema = this._schemas.get(aschemaNames[i]);
      if (schema) {
        r.push(schema);
      }
    }
    return r;
  }

  /** @payload string[]: Re-Loaded spec files*/
  async loadSchemaSpecs(aspecsPath: string) {

    let r = new Rst.ApgRst();
    r.setPayload(new Rst.ApgRstPayload('path', aspecsPath));
    this._loggable.logBegin(this.loadSchemaSpecs.name, r)

    let specFiles: string[] = [];
    r = new Rst.ApgRst();
    const validator = this.#getValidator(this._SCHEMA_SPEC_VALIDATOR, this.loadSchemaSpecs.name);

    r = await this.#loadSchemaSpecsInFolder(aspecsPath, validator!);

    if (r.Ok) {
      specFiles = r.getPayload("string[]") as string[];
      const message = `Loaded successfully ${specFiles.length} schema spec files from folder ${aspecsPath}`;
      const payload = new Rst.ApgRstPayload('string[]', specFiles);
      r = new Rst.ApgRst({ message, payload })
    }

    this._loggable.logEnd(r);
    return r;
  }

  #getValidator(avalidatorName: string, afunctionName: string) {
    const rawValidator = this._validators.get(avalidatorName);
    Rst.ApgRstAssert.IsUndefined(
      rawValidator,
      `validator for ${avalidatorName} in ${afunctionName}`
    );
    const validator = rawValidator!;
    return validator;
  }

  /** 
   * @payload OK: string[]: Loaded spec files
   * @payload KO: IApgAjvValidatorSpecError[]: validation errors
  */
  async #loadSchemaSpecsInFolder(
    apath: string,
    avalidator: ApgJsvAjvValidator,
  ) {
    let r = new Rst.ApgRst();
    r.setPayload(new Rst.ApgRstPayload('path', apath))

    this._loggable.logBegin(this.#loadSchemaSpecsInFolder.name, r);

    const errors: IApgJsvAjvValidatorSpecError[] = [];
    const files: string[] = [];
    r = new Rst.ApgRst();

    if (!Uts.ApgUtsFs.FolderExistsSync(apath)) {
      r = Rst.ApgRstErrors.NotFound(
        eApgJsvCodedErrors.JSV_Schema_Spec_Folder_NotFound_1,
        undefined,
        [apath]
      );
    }
    else {
      const specFiles: string[] = Uts.ApgUtsFs.GetFileNamesSortedSync(apath);

      for (const fileName of specFiles) {

        if (r.Ok) {
          const frg: string[] = fileName.split('.');
          const file = StdPath.join(apath, fileName);

          r = await this.#loadSpecs(frg[0], file, avalidator, errors);
          files.push(file);
        }
      }
    }

    if (r.Ok) {
      const p = new Rst.ApgRstPayload('string[]', files);
      r.setPayload(p);
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

    let r = new Rst.ApgRst();
    let i = 0;
    data.forEach(element => {
      if (r.Ok) {
        r = avalidator.validate(element);

        if (!r.Ok) {
          const p = new Rst.ApgRstPayload('string', afile);
          r.setPayload(p);
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

    if (r.Ok) {
      this.validatorsSpecs.set(aname, specs);
      this.validatorsSpecsPaths.set(aname, afile);
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
    let r = new Rst.ApgRst();

    const cpath = this.validatorsSpecsPaths.get(aname);
    if (!cpath) {
      r = Rst.ApgRstErrors.NotFound(
        eApgJsvCodedErrors.JSV_Schema_NotFound_1, undefined, [aname]);
    }
    else {
      r = await this.#loadSpecs(aname, cpath, avalidator, aerrors);
    }

    this._loggable.logEnd(r);
    return r;
  }



  /** @payload IApgAjvResult */
  validate(aschemaName: string, aobj: unknown) {

    let r = new Rst.ApgRst();

    const validator = this._validators.get(aschemaName);

    if (!validator) {
      r = Rst.ApgRstErrors.NotFound(
        eApgJsvCodedErrors.JSV_Schema_NotFound_1,
        undefined,
        [aschemaName]);
    }
    else {
      r = validator!.validate(aobj);
    }
    return r;
  }

  getValidator(aschemaName: string) {
    return this._validators.get(aschemaName);
  }
}
