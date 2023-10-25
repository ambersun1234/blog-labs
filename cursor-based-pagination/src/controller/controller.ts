import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { SuccessMessages } from "../constant/constant";
import { generateResponse } from "../share/share";

export default {
  healthHandler: async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(generateResponse(SuccessMessages.Success));
  },
};
