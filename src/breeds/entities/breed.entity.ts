import { Animal } from "src/animals/entities/animal.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "race" })
export class Breed {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "nom", type: "varchar", length: 50, nullable: false })
    name: string;

    @OneToMany(() => Animal, (animal) => animal.breed)
    animals: Animal[];
}