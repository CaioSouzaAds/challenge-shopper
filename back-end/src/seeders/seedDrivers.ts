import "reflect-metadata";
import { AppDataSource } from "../config/dataSource";
import DriverEntity from "../entities/DriverEntity";

const seedDrivers = async () => {
  try {
    // Inicialize o AppDataSource
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Banco de dados inicializado para o seeder!");
    }

    // Acesse o repositório de DriverEntity
    const repository = AppDataSource.getRepository(DriverEntity);

    // Dados dos motoristas
    const drivers = [
      {
        name: "Homer Simpson",
        description: "Motorista camarada",
        vehicle: "Plymouth Valiant 1973",
        rating: 2,
        rate_per_km: 2.5,
        min_distance: 1,
      },
      {
        name: "Dominic Toretto",
        description: "Motorista rápido e confiável",
        vehicle: "Dodge Charger R/T 1970",
        rating: 4,
        rate_per_km: 5.0,
        min_distance: 5,
      },
      {
        name: "James Bond",
        description: "Classe e sofisticação",
        vehicle: "Aston Martin DB5",
        rating: 5,
        rate_per_km: 10.0,
        min_distance: 10,
      },
    ];

    // Insira os motoristas no banco
    await repository.save(drivers);
    console.log("Motoristas inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir motoristas:", error);
  } finally {
    process.exit(); // Encerre o processo após completar
  }
};

// Execute a função de seed
seedDrivers();
