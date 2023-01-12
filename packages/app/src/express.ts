/*! Copyright (c) 2020, XAPP AI */
import cors from "cors";
import express from "express";

import { handler } from "./index";

const DEFAULT_PORT = 8080;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    }
}
app.use(cors(corsOptions));

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

app.post("/", async (request, response) => {
    await handler(request.body, { request, express: true } as any, (whatever: any, stentorResponse: string) => {
        response.send(stentorResponse);
    });
});

// eslint-disable-next-line no-console
console.log(`Listening on port ${SERVER_PORT}...`);
app.listen(SERVER_PORT);