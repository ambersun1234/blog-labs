import { Request } from "express";

import { ResponseBody, ResponseData } from "../type/response";

export const parseRequestBody = (req: Request) => {
    return { url: req.path, method: req.method };
};

export const generateResponse = (
    message: string,
    data?: ResponseData
): ResponseBody => {
    return {
        message: message,
        data: data,
    };
};
