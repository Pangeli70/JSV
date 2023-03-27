/** -----------------------------------------------------------------------
 * @module [JSV/Dependencies]
 * @author [APG] ANGELI Paolo Giusto
 * ------------------------------------------------------------------------
*/
// https://deno.land/std
export * as StdFs from "https://deno.land/std@0.180.0/fs/mod.ts";
export * as StdPath from "https://deno.land/std@0.180.0/path/mod.ts";

//https://deno.land/x/dotenv
export * as DotEnv from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

//* This is the preferred source for Node Modules
// https://esm.sh/ajv
export type {
    ValidateFunction as AjvValidateFn,
    ErrorObject as AjvError,
} from 'https://esm.sh/ajv@8.11.0';
export * as Ajv from 'https://esm.sh/ajv@8.11.0';


// https://github

export * as Uts from "https://raw.githubusercontent.com/Pangeli70/apg-uts/master/mod.ts";
export * as Rst from "https://raw.githubusercontent.com/Pangeli70/apg-rst/master/mod.ts";
export * as Lgr from "https://raw.githubusercontent.com/Pangeli70/apg-lgr/master/mod.ts";

// export * as Uts from "../apg-uts/mod.ts";
// export * as Rst from "../apg-rst/mod.ts";
// export * as Lgr from "../apg-lgr/mod.ts";