import { Animal } from "src/animals/entities/animal.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rapport_veterinaire" })
export class VeterinaryReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "utilisateur_id", nullable: false })
  userId: string;
  
  @Column({ name: "animal_id", nullable: false })
  animalId: string;

  @Column({ name: "date_passage", type: "datetime" })
  passageDate: Date;

  @Column({ name: "etat", type: "varchar", length: 50, nullable: false })
  state : string;

  @Column({ name: "nourriture", type: "varchar", length: 50, nullable: false })
  food : string;

  @Column({ name: "grammage_nourriture", type: "float", nullable: false })
  foodWeight : number;

  @Column({ name: "detail_etat", type: "text", nullable: false })
  stateDetail: string;

  @ManyToOne(() => Animal, (animal) => animal.veterinaryReports)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;

  @ManyToOne(() => User, (user) => user.veterinaryReports)
  @JoinColumn({ name: "utilisateur_id" })
  user: User;
}