import { ChatMessagePart, MessageMiddlewareBuilder } from "@xapp/chat-widget";
import React from "react";
import { PasswordForm } from "../components";

export const passwordMiddlewareBuilder: MessageMiddlewareBuilder = next => props => {
    const { msg, ctx } = props;

    if (msg["type"] === "Password") {
        return (
            <ChatMessagePart showAvatar={false} user={ctx.user}>
                <PasswordForm msg={msg} ctx={ctx} />
            </ChatMessagePart>
        );
    }
    return next(props);
};