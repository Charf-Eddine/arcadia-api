import {
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm";

export type WeekDay = "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche"

@Entity({ name: "horaire" })
export class Schedule {
    @PrimaryColumn({ name: "jour_semaine", type: "enum", enum: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"], nullable: false })
    weekDay: WeekDay;

    @Column({ name: "ordre", nullable: false })
    order: number;

    @Column({ name: "ouverture", type: "time", nullable: false })
    opening: string;

    @Column({ name: "fermeture", type: "time", nullable: false })
    closing: string;
}
