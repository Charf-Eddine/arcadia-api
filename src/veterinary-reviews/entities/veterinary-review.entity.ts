import { Habitat } from "src/habitats/entities/habitat.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "avis_veterinaire" })
export class VeterinaryReview {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "utilisateur_id", nullable: false })
    userId: number;

    @Column({ name: "habitat_id", nullable: false })
    habitatId: number;

    @Column({ name: "date", type: "datetime" })
    date: Date;

    @Column({ name: "commentaire", type: "text", nullable: false })
    comment: string;

    @ManyToOne(() => Habitat, (habitat) => habitat.veterinaryReviews)
    @JoinColumn({ name: "habitat_id" })
    habitat: Habitat;

    @ManyToOne(() => User, (user) => user.veterinaryReviews)
    @JoinColumn({ name: "utilisateur_id" })
    user: User;
}
