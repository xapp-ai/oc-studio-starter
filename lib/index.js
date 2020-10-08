"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
/*! Copyright (c) 2020, XAPP AI */
// Loads the environment variables from a .env file at root
require("dotenv").config();
// Assistant
const stentor_1 = require("stentor");
// Channels
const stentor_alexa_1 = require("@xapp/stentor-alexa");
const stentor_dialogflow_1 = require("@xapp/stentor-dialogflow");
const CustomLex_1 = require("./channels/CustomLex");
// Services
const stentor_service_user_storage_1 = require("@xapp/stentor-service-user-storage");
// Custom Handlers
const question_answering_handler_1 = require("@xapp/question-answering-handler");
// Return the handler for running in an AWS Lambda function.
exports.handler = new stentor_1.Assistant()
    .withUserStorage(new stentor_service_user_storage_1.DynamoUserStorageService({
    appId: process.env.OVAI_APP_ID,
    tableName: "stentor-user-prod"
}))
    .withHandlers({
    QuestionAnsweringHandler: question_answering_handler_1.QuestionAnsweringHandler
})
    .withChannels([stentor_alexa_1.Alexa(), stentor_dialogflow_1.Dialogflow(), CustomLex_1.CustomLex()])
    .lambda();
//# sourceMappingURL=index.js.map