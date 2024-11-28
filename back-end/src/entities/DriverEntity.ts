import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("drivers")
export default class DriverEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  vehicle!: string;

  @Column({ type: "integer" })
  rating!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  rate_per_km!: number;

  @Column({ type: "integer" })
  min_distance!: number;
}
