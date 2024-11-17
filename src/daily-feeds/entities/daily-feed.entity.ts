import { Animal } from "src/animals/entities/animal.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "alimentation_quotidienne" })
export class DailyFeed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "utilisateur_id", nullable: false })
  userId: string;
  
  @Column({ name: "animal_id", nullable: false })
  animalId: string;

  @Column({ name: "date_passage", type: "datetime" })
  passageDate: Date;

  @Column({ name: "nourriture", type: "varchar", length: 50, nullable: false })
  food : string;

  @Column({ name: "grammage_nourriture", type: "float", nullable: false })
  foodWeight : number;

  @ManyToOne(() => Animal, (animal) => animal.dailyFeeds)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;

  @ManyToOne(() => User, (user) => user.dailyFeeds)
  @JoinColumn({ name: "utilisateur_id" })
  user: User;
}