/*! Copyright (c) 2022, XAPP AI */

import { AbstractHandler, keyFromRequest, Request } from "stentor";
import { log } from "stentor-logger";
import { CustomContext } from "../models/CustomContext";

// 1. Rename to something that describes what the handler does like "SearchHandler"
export class CustomContextHandler extends AbstractHandler {

    public canHandleRequest(request: Request, context: CustomContext): boolean {

        const key = keyFromRequest(request);

        const handled: string[] = ["HelpIntent"];

        if (handled.includes(key)) {
            return true;
        }

        return super.canHandleRequest(request, context);
    }

    // Use the CustomContext instead of the Context 
    public async handleRequest(request: Request, context: CustomContext): Promise<void> {

        const key = keyFromRequest(request);

        const item1 = context.customData.item1;
        // Gain access to the custom items on the context
        log().debug(`item1 ${item1}`);

        switch (key) {
            case this.intentId:
                // Kick off the flow
                context.response.say('Hello world!')
                    .reprompt("The reprompt is used on voice channels when the user doesn't respond.")
                    .withCard({
                        type: "CARD",
                        title: "Card",
                        content: "This is an example of a card"
                    });
                // Exit from the flow
                return;
            case 'HelpIntent':
                // Provide contextual help 
                context.response.say('This is handler specific help that is returned.');
                // Exit from the flow
                return;
            default:
            // Let it fall through to the super
            // 👇
        }

        return super.handleRequest(request, context);
    }
}