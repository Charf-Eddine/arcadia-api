import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "avis_visiteur" })
export class VisitorReview {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "pseudo", type: "varchar", length: 50, nullable: false })
    pseudo: string;

    @Column({ name: "commentaire", type: "text", nullable: false })
    comment: string;

    @Column({ name: "is_visible", nullable: false, default: false })
    isVisible: boolean;
}
