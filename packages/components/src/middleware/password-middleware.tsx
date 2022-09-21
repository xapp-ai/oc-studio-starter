import { MessageMiddlewareBuilder } from "@xapp/chat-widget";
import React from "react";
import { PasswordContainer } from "../components";

export const passwordMiddlewareBuilder: MessageMiddlewareBuilder = next => props => {
    const { msg, ctx } = props;

    if (msg["type"] === "Password") {
        return (
            <PasswordContainer msg={msg} ctx={ctx} />
        );
    }
    return next(props);
};