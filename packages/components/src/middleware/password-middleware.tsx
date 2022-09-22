/*! Copyright (c) 2022, XAPP AI */
import { MessageMiddlewareBuilder } from "@xapp/chat-widget";
import { PASSWORD_DISPLAY_TYPE } from "@xapp/oc-studio-starter-models";
import React from "react";
import { PasswordContainer } from "../components";

export const passwordMiddlewareBuilder: MessageMiddlewareBuilder = next => props => {
    const { msg, ctx } = props;

    if (msg["type"] === PASSWORD_DISPLAY_TYPE) {
        return (
            <PasswordContainer msg={msg} ctx={ctx} />
        );
    }
    return next(props);
};