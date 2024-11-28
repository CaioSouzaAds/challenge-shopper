import { Request, Response, NextFunction } from "express";
import express from "express";
import { HttpStatusCodes } from "../http/StatusCodes";
import { ErrorMessages } from "../http/Messages";

/**
 * Middleware para lidar com erros de sintaxe JSON.
 * Intercepta erros lançados ao analisar o corpo JSON da requisição.
 */
export const jsonBodyParser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  express.json()(req, res, (err: SyntaxError | undefined) => {
    if (err instanceof SyntaxError) {
      console.error("Erro de sintaxe JSON:", err.message);

      // Envia a resposta apropriada
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(ErrorMessages.INVALID_REQUEST);
    }
    next(); // Continua para o próximo middleware
  });
};
