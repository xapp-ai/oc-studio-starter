/*! Copyright (c) 2022, XAPP AI */
import { AbstractHandler, Context, keyFromRequest, Request } from "stentor";

// 1. Rename to something that describes what the handler does like "SearchHandler"
export class ExternalAPIHandler extends AbstractHandler {

    // 2. Define which requests the handler can handle
    public canHandleRequest(request: Request, context: Context): boolean {

        const key = keyFromRequest(request);

        const handled: string[] = ["HelpIntent"];

        if (handled.includes(key)) {
            return true;
        }

        return super.canHandleRequest(request, context);
    }

    // The handleRequest is called 
    public async handleRequest(request: Request, context: Context): Promise<void> {
        // 3. Write your custom logic
        const key = keyFromRequest(request);

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

        // 4. Let remaining requests fall through to the super
        //    It is not recommended to remove this
        return super.handleRequest(request, context);
    }
}