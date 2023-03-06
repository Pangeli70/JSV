/** -----------------------------------------------------------------------
 * @module [JSV] Json Schema Validator
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/04]
 * ------------------------------------------------------------------------
 */
import { Uts } from "./deps.ts";


export const ApgJsvDevLog: Uts.IApgUtsDevlog = {
    todo: [
        {
            milestone: "MAINTENANCE",
            description: "Improvements and bug fixing",
            activities: [
                "No further activity planned",
            ]
        },
    ],
    done: [
        {
            date: "20230304",
            version: "0.9.6",
            milestone: "MAINTENANCE",
            description: "Improvements and bug fixing",
            activities: [
                "Removed all coded messages",
                "Cleanup an renaming of basic schemas for better consistency",
                "Added schema dialect and domain",
                "Added and exported URI schema ids based on domain",
                "Created tests for generic schema validation"
            ]
        },

    ]
}