/*! Copyright (c) 2022, XAPP AI */
import { OptionSelectRequest } from "stentor-models";

/**
 * Request received from the PasswordForm custom component
 */
export interface PasswordRequest extends OptionSelectRequest {
    /**
     * User entered password
     */
    password: string;
}