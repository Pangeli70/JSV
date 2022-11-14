/** -----------------------------------------------------------------------
 * @module [JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/19] Porting to Deno
 * @version 0.9.2 [APG 2022/11/13] Github Beta
 * -----------------------------------------------------------------------
 */
import { AjvError } from '../../deps.ts';


/** Result of the Ajv Validation*/
export interface IApgJsvAjvResult {
  /** Object validated */
  validated: unknown;
  /** List of the errors produced bay the Ajv Validator */
  errors: AjvError[];
  /** Is used to add manually further details to the validation result specially if it fails */
  details?: unknown;
}
