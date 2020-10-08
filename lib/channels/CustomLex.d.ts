/*! Copyright (c) 2020, XAPP AI */
import { Channel, Request } from "stentor";
import { LexRequest } from "@xapp/stentor-lex-lib";
import { TranslateLexConnectRequest } from "@xapp/stentor-lex-connect";
export interface LexKendraAdditionalAttributes {
    key: "AnswerText" | string;
    valueType: "TEXT_WITH_HIGHLIGHTS_VALUE";
    value: {
        textWithHighlightsValue: {
            text: string;
            highlights: {
                beginOffset: number;
                endOffset: number;
                topAnswer?: boolean;
            }[];
        };
    };
}
/**
 * https://docs.aws.amazon.com/kendra/latest/dg/API_QueryResultItem.html
 *
 */
export interface LexKendraResponseResultItem {
    id: string;
    type: "ANSWER" | "DOCUMENT" | "QUESTION_ANSWER";
    additionalAttributes: LexKendraAdditionalAttributes[];
    documentId: string;
    documentTitle: {
        text: string;
        highlights: [];
    };
}
export interface LexKendraResponse {
    sdkResponseMetadata: {
        requestId: string;
    };
    sdkHttpMetadata: {
        httpHeaders: object;
        httpStatusCode: number;
        allHttpHeaders: object;
    };
    queryId: string;
    resultItems: LexKendraResponseResultItem[];
}
export interface LexRequestWithKendra extends LexRequest {
    kendraResponse?: LexKendraResponse;
}
export declare class TranslateLexConnectRequestWithKendra extends TranslateLexConnectRequest {
    translate(lexRequest: LexRequestWithKendra): Request;
}
export declare function CustomLex(): Channel;
