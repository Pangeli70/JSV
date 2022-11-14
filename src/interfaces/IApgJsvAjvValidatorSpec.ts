/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.4.0 [APG 2018/10/20]
 * @version 0.5.0 [APG 2018/11/24]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * -----------------------------------------------------------------------
 */


/** Interface used to verify the Ajv JSON schemas specs
 */
export interface IApgJsvAjvValidatorSpec {

  skip: boolean;
  verbose: boolean;
  properties: boolean;
  it: string;
  expected: boolean;
  error: string;
  keyword: string;
  object?: unknown;
}

