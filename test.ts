/** -----------------------------------------------------------------------
 * @module [JSV/Test]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/18] 
 * ------------------------------------------------------------------------
*/
import { StdPath, Uts } from "./deps.ts";
import { ApgJsvUtsSpecableSpec } from "./test/src/ApgJsvUtsSpecableSpec.ts";


export async function Run(arun: Uts.eApgUtsSpecRun) {


  if (arun != Uts.eApgUtsSpecRun.yes) return;

  const URI = "https://apg-tst.deno.dev";
  // const URI = "http://localhost:49609";
  const URI_STORE = URI + "/store";
  const URI_EVENTS = URI + "/events"

  const FRAMEWORK = "JSV";
  const SPEC = "UtsSpecableSpec";

  const FILE = StdPath.normalize("./test/results/" + SPEC + ".html");

  const validatorSpec = new ApgJsvUtsSpecableSpec();
  const r = await Uts.ApgUtsSpecable.RunTestAndGetHtmlResultFromTestService(validatorSpec, false, URI_STORE, URI_EVENTS, FRAMEWORK, SPEC, FILE);

  console.log(r)
  if (r.testResult) {
    console.log("Browse result at: " + FILE);
  }
}

await Run(Uts.eApgUtsSpecRun.yes);

// async function newFunction(URI_STORE: string, URI_EVENTS: string, FRAMEWORK: string, SPEC: string) {
//   const timer = {
//     current: 0,
//     last: 0,
//     test: 0,
//     store: 0,
//     fetch: 0,
//     html: 0,
//     save: 0
//   };

//   timer.last = timer.current = performance.now();
//   const validatorSpec = RunSpec();
//   timer.current = performance.now();
//   timer.test = timer.current - timer.last;
//   timer.last = timer.current;

//   const r1 = await validatorSpec.sendToTestService(URI_STORE, FRAMEWORK, SPEC);
//   timer.current = performance.now();
//   timer.store = timer.current - timer.last;
//   timer.last = timer.current;

//   if (r1.ok) {
//     const url = URI_EVENTS + "/" + FRAMEWORK + "/" + SPEC + "/last";
//     console.log(url);
//     const r2 = await fetch(url);
//     timer.current = performance.now();
//     timer.fetch = timer.current - timer.last;
//     timer.last = timer.current;

//     const html = await r2.text();
//     timer.current = performance.now();
//     timer.html = timer.current - timer.last;
//     timer.last = timer.current;


//     await Deno.writeTextFile(file, html);
//     timer.current = performance.now();
//     timer.save = timer.current - timer.last;
//     timer.current = timer.last = 0;
//     console.log(timer);
//   }
// }

