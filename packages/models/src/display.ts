/*! Copyright (c) 2022, XAPP AI */

export type PasswordDisplayType = "Password";
export const PASSWORD_DISPLAY_TYPE: PasswordDisplayType = "Password";

export interface PasswordDisplay {
    type: PasswordDisplayType
    disabled?: boolean;
}