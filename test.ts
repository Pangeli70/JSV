/** -----------------------------------------------------------------------
 * @module [JSV/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/18] 
 * @version 0.9.6 [APG 2023/03/04] 
 * ------------------------------------------------------------------------
*/
import { StdPath, Uts } from "./deps.ts";
import { ApgJsvSpec } from "./test/src/ApgJsvSpec.ts";
import { ApgJsvUtsSpecableSpec } from "./test/src/ApgJsvUtsSpecableSpec.ts";


export async function Run(arun: Uts.eApgUtsSpecRun) {


  if (arun != Uts.eApgUtsSpecRun.yes) return;

  const URI = "https://apg-tst.deno.dev";
  // const URI = "http://localhost:49609";
  const URI_STORE = URI + "/store";
  const URI_EVENTS = URI + "/events"

  const FRAMEWORK = "JSV";

  let spec = "ApgJsv_Spec";
  let file = StdPath.normalize("./test/results/" + spec + ".html");

  const jsvSpec = new ApgJsvSpec();
  let r = await Uts.ApgUtsSpecable.RunTestAndGetHtmlResultFromTestService(
    jsvSpec, false, URI_STORE, URI_EVENTS, FRAMEWORK, spec, file
  );
  console.log(r)
  console.log("Browse result at: " + file);

  spec = "ApgJsv_UtsSpecableSpec";
  file = StdPath.normalize("./test/results/" + spec + ".html");

  const specableSpec = new ApgJsvUtsSpecableSpec();
  r = await Uts.ApgUtsSpecable.RunTestAndGetHtmlResultFromTestService(
    specableSpec, false, URI_STORE, URI_EVENTS, FRAMEWORK, spec, file
  );
  console.log(r)
  console.log("Browse result at: " + file);


}

await Run(Uts.eApgUtsSpecRun.yes);


