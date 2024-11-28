import { Repository } from "typeorm";
import DriverEntity from "../entities/DriverEntity";
import { AppDataSource } from "../config/dataSource";

export default class DriverRepository {
  private repository: Repository<DriverEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(DriverEntity);
  }

  async findAll(): Promise<DriverEntity[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<DriverEntity | null> {
    return await this.repository.findOneBy({ id });
  }
}
