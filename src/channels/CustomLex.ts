/*! Copyright (c) 2020, XAPP AI */
import { Channel, Request, isIntentRequest } from "stentor";
import { log } from "stentor-logger";

import { LexRequest } from "@xapp/stentor-lex-lib";
import { TranslateLexConnectRequest } from "@xapp/stentor-lex-connect";
import { LEX_CONNECT_CHANNEL } from "@xapp/stentor-lex-connect/lib/Channel";

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
            }[]
        }
    }

}

/**
 * https://docs.aws.amazon.com/kendra/latest/dg/API_QueryResultItem.html
 * 
 */
export interface LexKendraResponseResultItem {
    id: string;
    type: "ANSWER" | "DOCUMENT" | "QUESTION_ANSWER",
    additionalAttributes: LexKendraAdditionalAttributes[];
    documentId: string;
    documentTitle: {
        text: string;
        highlights: []
    }
}

export interface LexKendraResponse {
    sdkResponseMetadata: {
        requestId: string;
    };
    sdkHttpMetadata: {
        httpHeaders: Record<string, unknown>;
        httpStatusCode: number;
        allHttpHeaders: Record<string, unknown>;
    };
    queryId: string;
    resultItems: LexKendraResponseResultItem[];
}

export interface LexRequestWithKendra extends LexRequest {
    kendraResponse?: LexKendraResponse;
}

export class TranslateLexConnectRequestWithKendra extends TranslateLexConnectRequest {

    public translate(lexRequest: LexRequestWithKendra): Request {
        const translated = super.translate(lexRequest);

        if (lexRequest.kendraResponse) {
            log().debug('we have a kendra response!');
            log().debug(JSON.stringify(lexRequest.kendraResponse, undefined, 2));
            let answer: string;
            let bestGuess: string;
            lexRequest.kendraResponse.resultItems.forEach((result) => {
                if (result.type === "ANSWER") {
                    log().debug(`We have an answer from ${result.documentTitle.text}`);
                    // console.log(JSON.stringify(result, undefined, 2));
                    // Now find the top answer
                    result.additionalAttributes.forEach((attribute) => {
                        if (attribute.key === "AnswerText") {
                            const text = attribute.value.textWithHighlightsValue.text;
                            // console.log(text);
                            attribute.value.textWithHighlightsValue.highlights.forEach((highlight) => {

                                if (highlight.topAnswer) {
                                    answer = text.substring(highlight.beginOffset, highlight.endOffset);
                                } else {
                                    if (!bestGuess) {
                                        bestGuess = text.substring(highlight.beginOffset, highlight.endOffset);
                                    }
                                    log().debug(`Not a top answer ${text.substring(highlight.beginOffset, highlight.endOffset)}`)
                                }
                            })
                        }
                    });
                }
            });

            log().debug(`Final answer to "${translated.rawQuery}"`);
            log().debug(answer)
            log().debug(`The best guess?`);
            log().debug(bestGuess);

            let matchConfidence = 0;
            if (answer) {
                matchConfidence = 1;
            } else if (bestGuess) {
                matchConfidence = 0.5;
            }

            if (isIntentRequest(translated)) {

                translated.knowledgeAnswer = {
                    faqQuestion: translated.rawQuery,
                    answer: answer || bestGuess,
                    matchConfidence
                }
                log().debug('Adding KnowledgeAnser');
                log().debug(translated.knowledgeAnswer);
            }
        }

        return translated;
    }
}

export function CustomLex(): Channel {
    return {
        ...LEX_CONNECT_CHANNEL,
        request: new TranslateLexConnectRequestWithKendra()
    }
}