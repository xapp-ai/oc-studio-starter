/*! Copyright (c) 2023, XAPP AI */

import { Request } from "stentor";
import { PasswordRequest } from "@xapp/oc-studio-starter-models";

export function isPasswordRequest(request: Request): request is PasswordRequest {
    return !!request && !!(request as PasswordRequest).password;
}