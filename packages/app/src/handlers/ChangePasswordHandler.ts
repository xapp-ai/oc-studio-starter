/*! Copyright (c) 2022, XAPP AI */
import { PasswordDisplay, PASSWORD_DISPLAY_TYPE } from "@xapp/oc-studio-starter-models";
import { AbstractHandler, Context, keyFromRequest, Request } from "stentor";
import { isPasswordRequest } from "../guards/isPasswordRequest";


export class ChangePasswordHandler extends AbstractHandler {

    public canHandleRequest(request: Request, context: Context): boolean {

        const key = keyFromRequest(request);

        const handled: string[] = ["HelpIntent", "OptionSelect"];

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
            case "OptionSelect":
                // Grab the password
                if (isPasswordRequest(request)) {
                    const newPassword = request.password;
                    // eslint-disable-next-line no-console
                    console.log(`Saving new password that starts with: ${newPassword.substring(0, 1)}`);
                    // don't actually print out a password but save it somewhere
                    context.response.say(`Thanks, we have updated your password.`);
                }
                return;
            case this.intentId:
                const display: PasswordDisplay = {
                    type: PASSWORD_DISPLAY_TYPE
                }
                // Kick off the flow
                context.response.say('Please enter your new password below.')
                    .reprompt("Please enter your new password in the field.")
                    .withDisplay(display);
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