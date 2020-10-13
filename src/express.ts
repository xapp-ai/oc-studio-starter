/*! Copyright (c) 2020, XAPP AI */

import { handler as stentorHandler } from "./index";

const DEFAULT_PORT = 8080;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

require("dotenv").config();

app.post("/", async (request: any, response: any) => {
    await stentorHandler(request.body, { request } as any, (whatever: any, stentorResponse: string) => {
        response.send(stentorResponse);
    });
});

console.log(`Listening on port ${SERVER_PORT}...`);
app.listen(SERVER_PORT);