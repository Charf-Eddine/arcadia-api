import { DailyFeed } from "src/daily-feeds/entities/daily-feed.entity";
import { VeterinaryReport } from "src/veterinary-reports/entities/veterinary-report.entity";
import { VeterinaryReview } from "src/veterinary-reviews/entities/veterinary-review.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

export type UserRoleType = "admin" | "employee" | "veterinerian"

@Entity({ name: "utilisateur" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "password", type: "varchar", length: 50, nullable: true })
    password: string;

    @Column({ name: "nom", type: "varchar", length: 100, nullable: false })
    lastname: string;

    @Column({ name: "prenom", type: "varchar", length: 50, nullable: false })
    firstname: string;

    @Column({ name: "email", type: "varchar", length: 100, nullable: false })
    email: string;

    @Column({ name: "role", type: "enum", enum: ["admin", "employee", "veterinerian"], nullable: false })
    role: UserRoleType;
    
    @Column({ name: "date_creation", type: "datetime" })
    dateCreation: Date;
    
    @OneToMany(() => VeterinaryReport, (veterinaryReport) => veterinaryReport.user)
    veterinaryReports: VeterinaryReport[];

    @OneToMany(() => DailyFeed, (dailyFeed) => dailyFeed.user)
    dailyFeeds: DailyFeed[];

    @OneToMany(() => VeterinaryReview, (veterinaryReview) => veterinaryReview.user)
    veterinaryReviews: VeterinaryReview[];
}