import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../../http/StatusCodes";
import { ErrorMessages } from "../../http/Messages";
import DriverRepository from "../../repositories/DriverRepository";

const driverRepository = new DriverRepository();

export const validateListRides = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  // Verifica se o customer_id está presente
  if (!customer_id) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.MISSING_IDENTIFIERS);
  }

  // Valida o driver_id, se fornecido
  if (driver_id) {
    // Verifica se o driver_id é um número válido
    if (isNaN(Number(driver_id))) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error_code: "INVALID_DRIVER",
        error_description: "O ID do motorista deve ser um número válido.",
      });
    }

    // Verifica se o motorista existe no banco de dados
    const driverExists = await driverRepository.findById(Number(driver_id));
    if (!driverExists) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(ErrorMessages.INVALID_DRIVER);
    }
  }

  // Passa os dados validados para o próximo middleware/controller
  next();
};
