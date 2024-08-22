import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "race" })
export class Breed {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "nom", type: "varchar", length: 50, nullable: false })
    name: string;
}