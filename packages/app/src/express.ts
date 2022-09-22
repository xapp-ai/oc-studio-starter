/*! Copyright (c) 2020, XAPP AI */

import { handler } from "./index";

const DEFAULT_PORT = 8080;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

app.post("/", async (request: any, response: any) => {
    await handler(request.body, { request } as any, (whatever: any, stentorResponse: string) => {
        response.send(stentorResponse);
    });
});

// eslint-disable-next-line no-console
console.log(`Listening on port ${SERVER_PORT}...`);
app.listen(SERVER_PORT);