import { Animal } from "src/animals/entities/animal.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "alimentation_quotidienne" })
export class DailyFeed {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "utilisateur_id", nullable: false })
    userId: number;

    @Column({ name: "animal_id", nullable: false })
    animalId: number;

    @Column({ name: "date_passage", type: "datetime" })
    passageDate: Date;

    @Column({ name: "nourriture", type: "varchar", length: 50, nullable: false })
    food: string;

    @Column({ name: "grammage_nourriture", type: "float", nullable: false })
    foodWeight: number;

    @ManyToOne(() => Animal, (animal) => animal.dailyFeeds)
    @JoinColumn({ name: "animal_id" })
    animal: Animal;

    @ManyToOne(() => User, (user) => user.dailyFeeds)
    @JoinColumn({ name: "utilisateur_id" })
    user: User;
}
