import { Repository } from "typeorm";
import RideEntity from "../entities/RideEntity";
import { AppDataSource } from "../config/dataSource";

export default class RideRepository {
  private repository: Repository<RideEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(RideEntity);
  }

  // Salva uma nova corrida no banco de dados
  async save(ride: RideEntity): Promise<RideEntity> {
    return await this.repository.save(ride);
  }

  // Busca todas as corridas realizadas por um cliente
  async findByCustomer(customerId: string): Promise<RideEntity[]> {
    return await this.repository.find({ where: { customer_id: customerId } });
  }

  // Busca corridas realizadas por um cliente, filtrando opcionalmente pelo motorista
  async findByCustomerAndDriver(
    customer_id: string,
    driver_id?: number
  ): Promise<RideEntity[]> {
    const query = this.repository
      .createQueryBuilder("ride")
      .leftJoinAndSelect("ride.driver", "driver")
      .where("ride.customer_id = :customer_id", { customer_id });

    if (driver_id) {
      query.andWhere("driver.id = :driver_id", { driver_id });
    }

    query.orderBy("ride.date", "DESC");

    return await query.getMany();
  }
}
