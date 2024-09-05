import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Habitat } from "./habitat.entity";

@Entity({ name: "image_habitat" })
export class HabitatImage {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "habitat_id", nullable: false })
    habitatId: number;

    @Column({ name: 'filename', type: "varchar", length: 50, nullable: false })
    filename: string;

    @ManyToOne(() => Habitat, (habitat) => habitat.images)
    @JoinColumn({ name: "habitat_id" })
    habitat: Habitat;
}