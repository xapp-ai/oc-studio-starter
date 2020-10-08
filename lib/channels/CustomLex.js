"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLex = exports.TranslateLexConnectRequestWithKendra = void 0;
/*! Copyright (c) 2020, XAPP AI */
const stentor_1 = require("stentor");
const stentor_lex_connect_1 = require("@xapp/stentor-lex-connect");
const Channel_1 = require("@xapp/stentor-lex-connect/lib/Channel");
class TranslateLexConnectRequestWithKendra extends stentor_lex_connect_1.TranslateLexConnectRequest {
    translate(lexRequest) {
        const translated = super.translate(lexRequest);
        if (lexRequest.kendraResponse) {
            console.log('we have a kendra response!');
            console.log(JSON.stringify(lexRequest.kendraResponse, undefined, 2));
            let answer;
            let bestGuess;
            lexRequest.kendraResponse.resultItems.forEach((result) => {
                if (result.type === "ANSWER") {
                    console.log(`We have an answer from ${result.documentTitle.text}`);
                    // console.log(JSON.stringify(result, undefined, 2));
                    // Now find the top answer
                    result.additionalAttributes.forEach((attribute) => {
                        if (attribute.key === "AnswerText") {
                            const text = attribute.value.textWithHighlightsValue.text;
                            // console.log(text);
                            attribute.value.textWithHighlightsValue.highlights.forEach((highlight) => {
                                if (highlight.topAnswer) {
                                    answer = text.substring(highlight.beginOffset, highlight.endOffset);
                                }
                                else {
                                    if (!bestGuess) {
                                        bestGuess = text.substring(highlight.beginOffset, highlight.endOffset);
                                    }
                                    console.log(`Not a top answer ${text.substring(highlight.beginOffset, highlight.endOffset)}`);
                                }
                            });
                        }
                    });
                }
            });
            console.log(`Final answer to "${translated.rawQuery}"`);
            console.log(answer);
            console.log(`The best guess?`);
            console.log(bestGuess);
            let matchConfidence = 0;
            if (answer) {
                matchConfidence = 1;
            }
            else if (bestGuess) {
                matchConfidence = 0.5;
            }
            if (stentor_1.isIntentRequest(translated)) {
                translated.knowledgeAnswer = {
                    faqQuestion: translated.rawQuery,
                    answer: answer || bestGuess,
                    matchConfidence
                };
                console.log('Adding knowledgeAnser');
                console.log(translated.knowledgeAnswer);
            }
        }
        return translated;
    }
}
exports.TranslateLexConnectRequestWithKendra = TranslateLexConnectRequestWithKendra;
function CustomLex() {
    return Object.assign(Object.assign({}, Channel_1.LEX_CONNECT_CHANNEL), { request: new TranslateLexConnectRequestWithKendra() });
}
exports.CustomLex = CustomLex;
;
//# sourceMappingURL=CustomLex.js.map