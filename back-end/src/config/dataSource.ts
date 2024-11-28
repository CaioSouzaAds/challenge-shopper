import "reflect-metadata";
import { DataSource } from "typeorm";
import RideEntity from "../entities/RideEntity";
import DriverEntity from "../entities/DriverEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [RideEntity, DriverEntity],
});
