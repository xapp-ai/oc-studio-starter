/*! Copyright (c) 2022, XAPP AI */
import { passwordMiddlewareBuilder } from "./middleware";

(window["xappMsgMiddlewares"] = window["xappMsgMiddlewares"] || []).push(passwordMiddlewareBuilder);

export { default as React } from "react";
export { passwordMiddlewareBuilder };
