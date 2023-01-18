/*! Copyright (c) 2020, XAPP AI */
// Loads the environment variables from a .env file at root
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// Lambda
import { Callback, Context } from "aws-lambda";

// Assistant
import { Assistant, setEnv } from "stentor";

// Channels
import { GoogleBusinessMessages } from "@xapp/stentor-gbm";
import { LexV2Channel } from "@xapp/stentor-lex-v2";
import { Stentor } from "stentor-channel";

// NLU
import { LexServiceV2 } from "@xapp/stentor-service-lex";

// Services
import { DynamoUserStorage } from "stentor-user-storage-dynamo";
import { StudioService } from "stentor-service-studio";

// Custom Handlers
import { QuestionAnsweringHandler } from "@xapp/question-answering-handler";
import { ContactCaptureHandler } from "@xapp/contact-capture-handler";

export async function handler(event: any, context: Context, callback: Callback<any>): Promise<void> {
    await setEnv().then().catch((error: Error) => console.error("Environment failed to load", error));

    // Leverage external NLU
    const nlu = new LexServiceV2({
        botId: process.env.LEX_BOT_ID,
        botAliasId: process.env.LEX_BOT_ALIAS_ID
    });

    const studioService: StudioService = new StudioService({ appId: process.env.STUDIO_APP_ID, token: process.env.STUDIO_TOKEN });

    // Return the handler for running in an AWS Lambda function.
    const assistant = new Assistant()
        // We are using a simple dynamo user storage but all you need is something that implements the interface UserStorageService
        .withUserStorage(new DynamoUserStorage())
        .withKnowledgeBaseService(studioService, {
            // Intent ID for your fallback to determine if we call  KnowledgeBase
            matchIntentId: "InputUnknown",
            // For KnowledgeBase results we will generate a request with the following ID
            setIntentId: "OCSearch"
        })
        .withHandlers({
            // Add pre-built handlers or make custom ones!
            ContactCaptureHandler: ContactCaptureHandler,
            QuestionAnsweringHandler: QuestionAnsweringHandler
        })
        .withChannels([
            // Add/Remove your channels here, even make custom ones!
            // Alexa(), <-- add package @xapp/stentor-alexa & import { Alexa } from "@xapp/stentor-alexa";
            // Note about Alexa: You may have trouble building with the current webpack config if you bring in Alexa
            // Dialogflow(), <-- add package @xapp/stentor-dialogflow & import { Dialogflow } from "@xapp/stentor-dialogflow";
            // LexConnect(), <-- add package @xapp/stentor-lex-connect & import { LexConnect } from "@xapp/stentor-lex-connect"

            GoogleBusinessMessages(nlu, {
                //  Customize your bot name
                botAvatarName: "Assistant"
            }),
            LexV2Channel(),
            Stentor(nlu)
        ])
        .lambda();

    await assistant(event, context, callback);
}