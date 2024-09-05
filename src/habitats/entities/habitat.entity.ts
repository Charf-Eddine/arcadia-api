import { Animal } from "src/animals/entities/animal.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { HabitatImage } from "./habitat-image.entity";
import { VeterinaryReview } from "src/veterinary-reviews/entities/veterinary-review.entity";

@Entity({ name: "habitat" })
export class Habitat {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "nom", type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ name: "description", type: "text", nullable: false })
    description: string;

    @OneToMany(() => Animal, (animal) => animal.habitat)
    animals: Animal[];

    @OneToMany(() => VeterinaryReview, (veterinaryReview) => veterinaryReview.habitat)
    veterinaryReviews: VeterinaryReview[];


    @OneToMany(() => HabitatImage, (image) => image.habitat, { cascade: true })
    images: HabitatImage[];


}
