import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "service" })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "nom", type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "date_creation", type: "datetime" })
  dateCreation: Date;
}