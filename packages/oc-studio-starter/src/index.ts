/*! Copyright (c) 2020, XAPP AI */
// Loads the environment variables from a .env file at root
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// Assistant
import { Assistant } from "stentor";

// Channels
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";
import { LexConnect } from "@xapp/stentor-lex-connect";
import { Stentor } from "stentor-channel";

// Services
import { DynamoUserStorage } from "stentor-user-storage-dynamo";

// Custom Handlers
import { QuestionAnsweringHandler } from "@xapp/question-answering-handler";

// Return the handler for running in an AWS Lambda function.
export const handler: AWSLambda.Handler = new Assistant()
    .withUserStorage(new DynamoUserStorage())
    .withHandlers({
        QuestionAnsweringHandler: QuestionAnsweringHandler
    })
    .withChannels([Alexa(), Dialogflow(), LexConnect(), Stentor()])
    .lambda();