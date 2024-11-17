import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./animal.entity";

@Entity({ name: "image_animal" })
export class AnimalImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "animal_id", nullable: false })
  animalId: string;

  @Column({ name: 'filename', type: "varchar", length: 50, nullable: false })
  filename: string;

  @ManyToOne(() => Animal, (animal) => animal.images)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;
}