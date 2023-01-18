/*! Copyright (c) 2022, XAPP AI */
import { Request } from "stentor";
import { hasSessionId } from "stentor-guards";
import { log } from "stentor-logger";
import { AbstractResponseBuilder, NLUService, Storage } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";

export type PreResponseHook = (request: Request, response: AbstractResponseBuilder, storage: Storage) => Promise<{
    request: Request;
    response: AbstractResponseBuilder;
    storage: Storage;
}>;

/**
 * Called right before we send the response.
 * 
 * This is currently used to set the context on the nlu if we have any active contexts.
 * 
 * @param nlu - Required to update the active context
 * @returns 
 */
export function preResponseHook(nlu: NLUService): PreResponseHook {
    return async function preResponseHook(request: Request, response: AbstractResponseBuilder, storage: Storage): Promise<{
        request: Request;
        response: AbstractResponseBuilder;
        storage: Storage;
    }> {

        if (hasSessionId(request)) {

            const resp = response.response;
            const sessionId = request.sessionId;

            if (existsAndNotEmpty(resp.context?.active) && typeof nlu?.setContext === "function") {
                const debug: string = resp.context.active.reduce((prev, current) => {
                    return `${prev} ${current.name} turns: ${current.timeToLive.turnsToLive}`;
                }, "")
                log().info(`Sending active context for session ${sessionId}: ${debug}`);

                await nlu.setContext({
                    userId: request.userId,
                    sessionId,
                    activeContext: resp.context?.active
                });
            }
        }

        return { request, response, storage };
    }
}
