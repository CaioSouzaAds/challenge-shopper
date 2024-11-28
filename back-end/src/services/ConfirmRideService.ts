import RideRepository from "../repositories/RideRepository";
import RideEntity from "../entities/RideEntity";

export default class ConfirmRideService {
  constructor(private rideRepository: RideRepository) {}


  

  async confirmRide(ride: RideEntity): Promise<RideEntity> {
    // Salvar a viagem no banco de dados
    return await this.rideRepository.save(ride);
  }
}
