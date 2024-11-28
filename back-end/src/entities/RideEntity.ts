import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import DriverEntity from "./DriverEntity";

@Entity("rides")
export default class RideEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  customer_id!: string;

  @Column({ type: "varchar", length: 255 })
  origin!: string;

  @Column({ type: "varchar", length: 255 })
  destination!: string;

  @Column({ type: "float" })
  distance!: number;

  @Column({ type: "varchar", length: 50 })
  duration!: string;

  @ManyToOne(() => DriverEntity)
  driver!: DriverEntity;

  @Column({ type: "decimal", precision: 7, scale: 2 })
  value!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date!: Date;

  toJSON() {
    return {
      id: this.id,
      customer_id: this.customer_id,
      origin: this.origin,
      destination: this.destination,
      distance: this.distance,
      duration: this.duration,
      driver: this.driver,
      value: this.value,
      date: this.date,
    };
  }
}
