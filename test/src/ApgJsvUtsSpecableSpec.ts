/** -----------------------------------------------------------------------
 * @module [Jsv/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * @version 0.9.5 [APG 2023/02/15] Rst Simplification
 * ------------------------------------------------------------------------
 */

import { ApgJsvAjvValidator, ApgJsvService, ApgJsv_UTS_SPECABLE_SCHEMA } from "../../mod.ts";
import { Lgr, StdPath, Uts, Rst } from "../../deps.ts";

export class ApgJsvUtsSpecableSpec extends Uts.ApgUtsSpecable {

    jsv: ApgJsvService;

    constructor() {
        super(import.meta.url)
        const logger = new Lgr.ApgLgr("ApgJsvUtsSpecableSpec")
        this.jsv = new ApgJsvService(logger);
        this.flags = {
            [this.S01_Indirect.name]: Uts.eApgUtsSpecRun.yes,
        }
    }

    S01_Indirect() {

        const run = this.specInit(this.S01_Indirect.name);
        if (!run) return;

        const file = StdPath.normalize("./test/data/IApgUtsSpecableSpecs.json")
        this.specWhen(`trying read specs file: ${file}`);
        this.specWeExpect(`to get an array of objects`)
        const rawData = Deno.readTextFileSync(file);
        const data = JSON.parse(rawData);
        let r = Array.isArray(data);
        this.specWeGot((r) ? `an array of [${data.length}] items` : "an error", r);

        this.specWhen(`adding the [ApgJsv_UTS_SPECABLE_SCHEMA] validator`);
        this.specWeExpect(`to get a valid validator`)
        let rst = this.jsv.addValidator(ApgJsv_UTS_SPECABLE_SCHEMA, []);
        r = rst.ok;
        this.specWeGot((r) ? "Validator" : JSON.stringify(rst), r);

        this.specWhen(`validating the first item in the array red from file`);
        this.specWeExpect(`to get positive result`)
        const validator = Rst.ApgRst.ExtractPayload(rst,"ApgJsvAjvValidator") as ApgJsvAjvValidator;
        rst = validator.validate(data[0]);
        r = rst.ok;
        this.specWeGot((r) ? "a positive result" : JSON.stringify(rst), r);


        this.specResume();
    }


    override specExecuteSync() {
        this.S01_Indirect();
    }

}