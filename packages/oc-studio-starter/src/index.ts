/*! Copyright (c) 2020, XAPP AI */
// Loads the environment variables from a .env file at root
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// Lambda
import { Callback, Context } from "aws-lambda";

// Assistant
import { Assistant, setEnv } from "stentor";

// Channels
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";
import { LexConnect } from "@xapp/stentor-lex-connect";
import { LexV2Channel } from "@xapp/stentor-lex-v2";
import { Stentor } from "stentor-channel";

// NLU
import { LexServiceV2 } from "@xapp/stentor-service-lex";

// Services
import { DynamoUserStorage } from "stentor-user-storage-dynamo";
import { StudioService } from "stentor-service-studio";

// Custom Handlers
import { QuestionAnsweringHandler } from "@xapp/question-answering-handler";

export async function handler(event: any, context: Context, callback: Callback<any>): Promise<void> {
    await setEnv().then().catch((error: Error) => console.error("Environment failed to load", error));

    // Leverage external NLU
    const nlu = new LexServiceV2({
        botId: process.env.LEX_BOT_ID,
        botAlias: process.env.LEX_BOT_ALIAS
    });

    const studioService: StudioService = new StudioService({ appId: process.env.STUDIO_APP_ID, token: process.env.STUDIO_TOKEN });

    // Return the handler for running in an AWS Lambda function.
    const assistant = new Assistant()
        .withUserStorage(new DynamoUserStorage())
        .withHandlerService(studioService)
        .withKnowledgeBaseService(studioService, {
            // Intent ID for your fallback to determine if we call  KnowledgeBase
            matchIntentId: "InputUnknown",
            // For KnowledgeBase results we will generate a request with the following ID
            setIntentId: "OCSearch"
        })
        .withHandlers({
            QuestionAnsweringHandler: QuestionAnsweringHandler
        })
        .withChannels([Alexa(), Dialogflow(), LexConnect(), LexV2Channel(), Stentor(nlu)])
        .lambda();

    await assistant(event, context, callback);
}