/*! Copyright (c) 2022, XAPP AI */
import { Context } from "stentor";

export interface CustomContext extends Context {
    customData: {
        item1: string;
        item2: string;
    }
}