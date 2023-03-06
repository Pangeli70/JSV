/** -----------------------------------------------------------------------
 * @module [Jsv/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04]
 * ------------------------------------------------------------------------
 */

import { Lgr, Uts, Rst } from "../../deps.ts";
import { ApgJsvAjvValidator, ApgJsvService } from "../../mod.ts";
import { eApgJsv_TEST_ENUM_NUMERIC_SCHEMA, eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID } from "./eApgJsv_TEST_ENUM_NUMERIC_SCHEMA.ts";
import { eApgJsv_TEST_ENUM_STRING_SCHEMA_ID, eApgJsv_TEST_ENUM_STRING_SCHEMA } from "./eApgJsv_TEST_ENUM_TEXT_SCHEMA.ts";
import { IApgJsv_TEST_INTERFACE_SCHEMA, IApgJsv_TEST_INTERFACE_SCHEMA_ID } from "./IApgJsv_TEST_INTERFACE_SCHEMA.ts";


const testData = [
    {
        mandatory: "Required",
        optional: false,
        numEnum: 1,
        stringEnum: "first"
    },
    {
        mandatory: "Required",
        numEnum: 1,
        stringEnum: "first"
    },
    {
        mandnatory: "Wrong so is missing",
        numEnum: 1,
        stringEnum: "first"
    },
    {
        mandatory: "Required",
        numEnum: 4, // wrong enum value
        stringEnum: "first"
    },
    {
        mandatory: "Required",
        optional: false,
        numEnum: 5,
        stringEnum: "nonsense" // wrong enum value
    },
    {
        mandatory: "Required",
        optional: 'nonsense', // wrong type
        numEnum: 5,
        stringEnum: "fifth"
    },
    {
        mandatory: "Required",
        optional: false,
        numEnum: 5,
        stringEnum: "fifth",
        unexpected: "Not allowed additional param"
    },
];


export class ApgJsvSpec extends Uts.ApgUtsSpecable {

    jsv: ApgJsvService;

    validator?: ApgJsvAjvValidator;

    constructor() {
        super(import.meta.url)
        const logger = new Lgr.ApgLgr("ApgJsvSpec")
        this.jsv = new ApgJsvService(logger);
        this.flags = {
            [this.S01_CreateSchemas.name]: Uts.eApgUtsSpecRun.yes,
            [this.S02_ValidateData.name]: Uts.eApgUtsSpecRun.yes,
        }
    }

    S01_CreateSchemas() {

        const run = this.specInit(this.S01_CreateSchemas.name);
        if (!run) return;


        this.specWhen(`adding the [${eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID}] validator`);
        this.specWeExpect(`to get a valid validator`)
        let rst = this.jsv.addValidator(eApgJsv_TEST_ENUM_NUMERIC_SCHEMA, []);
        let r = rst.ok;
        this.specWeGot((r) ? "Validator" : JSON.stringify(rst), r);


        this.specWhen(`adding the [${eApgJsv_TEST_ENUM_STRING_SCHEMA_ID}] validator`);
        this.specWeExpect(`to get a valid validator`)
        rst = this.jsv.addValidator(eApgJsv_TEST_ENUM_STRING_SCHEMA, []);
        r = rst.ok;
        this.specWeGot((r) ? "Validator" : JSON.stringify(rst), r);


        this.specWhen(`adding the [${IApgJsv_TEST_INTERFACE_SCHEMA_ID}] validator`);
        this.specWeExpect(`to get a valid validator`)
        rst = this.jsv.addValidator(IApgJsv_TEST_INTERFACE_SCHEMA, [eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID, eApgJsv_TEST_ENUM_STRING_SCHEMA_ID]);
        r = rst.ok;
        this.specWeGot((r) ? "Validator" : JSON.stringify(rst), r);


        this.specResume();
    }

    S02_ValidateData() {
        const run = this.specInit(this.S02_ValidateData.name);
        if (!run) return;

        let rst: Rst.IApgRst = { ok: true }

        let validator = this.jsv.getValidator(IApgJsv_TEST_INTERFACE_SCHEMA_ID);
        if (!validator) {
            rst = this.jsv.addValidator(eApgJsv_TEST_ENUM_NUMERIC_SCHEMA, []);
            if (rst.ok) { 
                rst = this.jsv.addValidator(eApgJsv_TEST_ENUM_STRING_SCHEMA, []);
            }
            if (rst.ok) { 
                rst = this.jsv.addValidator(IApgJsv_TEST_INTERFACE_SCHEMA, [eApgJsv_TEST_ENUM_NUMERIC_SCHEMA_ID, eApgJsv_TEST_ENUM_STRING_SCHEMA_ID]);
            }
            if (rst.ok) { 
                validator = Rst.ApgRst.ExtractPayload(rst, "ApgJsvAjvValidator") as ApgJsvAjvValidator;
            }
        }

        this.specWhen(`validating the test data`);
        this.specWeExpect(`to have a validator`)
        let r = rst.ok;
        this.specWeGot((r) ? "a positive result" : JSON.stringify(rst), r);

        if (!r) { 
            this.specResume();
            return;
        }

        this.specWhen(`validating the first valid test item`);
        this.specWeExpect(`to get positive result`)
        rst = validator!.validate(testData[0]);
        r = rst.ok;
        this.specWeGot((r) ? "a positive result" : JSON.stringify(rst), r);


        this.specWhen(`validating the second valid test item`);
        this.specWeExpect(`to get positive result even if the optional field is missing`)
        rst = validator!.validate(testData[1]);
        r = rst.ok;
        this.specWeGot((r) ? "a positive result" : JSON.stringify(rst), r);


        this.specWhen(`validating the third test item`);
        this.specWeExpect(`to get negative result because a required field is mispelled so missing`)
        rst = validator!.validate(testData[2]);
        r = !rst.ok;
        this.specWeGot((r) ? `a negative result: ${rst.message!}` : JSON.stringify(rst), r);


        this.specWhen(`validating the fourth test item`);
        this.specWeExpect(`to get negative result because we are using a numeric value outside the enum`)
        rst = validator!.validate(testData[3]);
        r = !rst.ok;
        this.specWeGot((r) ? `a negative result: ${rst.message!}` : JSON.stringify(rst), r);


        this.specWhen(`validating the fifth test item`);
        this.specWeExpect(`to get negative result because we are using a string value outside the enum`)
        rst = validator!.validate(testData[4]);
        r = !rst.ok;
        this.specWeGot((r) ? `a negative result: ${rst.message!}` : JSON.stringify(rst), r);


        this.specWhen(`validating the sixth test item`);
        this.specWeExpect(`to get negative result because we are using a wrong type for the optional property`)
        rst = validator!.validate(testData[5]);
        r = !rst.ok;
        this.specWeGot((r) ? `a negative result: ${rst.message!}` : JSON.stringify(rst), r);


        this.specWhen(`validating the seventh test item`);
        this.specWeExpect(`to get negative result because we have inserted a not allowed additional property`)
        rst = validator!.validate(testData[6]);
        r = !rst.ok;
        this.specWeGot((r) ? `a negative result: ${rst.message!}` : JSON.stringify(rst), r);

        this.specResume();
    }

    override specExecuteSync() {
        this.S01_CreateSchemas();
        this.S02_ValidateData();
    }

}