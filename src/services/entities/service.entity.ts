import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "service" })
export class Service {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "nom", type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ name: "description", type: "text", nullable: false })
    description: string;
}