/*! Copyright (c) 2020, XAPP AI */
// Loads the environment variables from a .env file at root
require("dotenv").config();

// Assistant
import { Assistant } from "stentor";

// Channels
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";
import { CustomLex } from "./channels/CustomLex";

// Services
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";

// Custom Handlers
import { QuestionAnsweringHandler } from "@xapp/question-answering-handler";

// Return the handler for running in an AWS Lambda function.
export const handler: AWSLambda.Handler = new Assistant()
    .withUserStorage(
        new DynamoUserStorageService({
            appId: process.env.OVAI_APP_ID,
            tableName: "stentor-user-prod"
        })
    )
    .withHandlers({
        QuestionAnsweringHandler
    })
    .withChannels([Alexa(), Dialogflow(), CustomLex()])
    .lambda();