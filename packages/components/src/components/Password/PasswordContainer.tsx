/*! Copyright (c) 2022, XAPP AI */
import { ChatMessagePart, ChatMessageRequestCustom, MessageMiddlewareProps } from "@xapp/chat-widget";
import { PasswordRequest } from "@xapp/oc-studio-starter-models";
import React, { FC, FormEvent, useCallback, useState } from "react";
import { PasswordInput } from "./PasswordInput";

export type PasswordContainerProps = MessageMiddlewareProps;

export const PasswordContainer: FC<PasswordContainerProps> = props => {
    const { ctx } = props;

    const [pwd, setPwd] = useState<string>("");
    const [sent, setSent] = useState<boolean>(false);

    const handleSubmit = useCallback((ev: FormEvent) => {
        setSent(true);

        const request: Partial<PasswordRequest> = {
            type: "OPTION_SELECT_REQUEST",
            intentId: "OptionSelect",
            password: pwd
        };

        const message: ChatMessageRequestCustom = {
            type: "custom",
            payload: JSON.stringify(request)
        } as ChatMessageRequestCustom;

        ctx.send(message);
        ev.preventDefault();
    }, [pwd, ctx]);

    return (
        <ChatMessagePart showAvatar={false} user={ctx.user}>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Enter password:
                        <PasswordInput value={pwd} onChange={setPwd} disabled={sent} />
                    </label>
                </p>
                <p>
                    <button type="submit" disabled={sent} >Submit</button>
                </p>
            </form>
        </ChatMessagePart>
    );
};