import { Breed } from "src/breeds/entities/breed.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnimalImage } from "./animal-image.entity";
import { Habitat } from "src/habitats/entities/habitat.entity";
import { VeterinaryReport } from "src/veterinary-reports/entities/veterinary-report.entity";
import { DailyFeed } from "src/daily-feeds/entities/daily-feed.entity";

@Entity({ name: "animal" })
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "prenom", type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ name: "race_id", nullable: false })
  breedId: string;

  @Column({ name: "habitat_id", nullable: false })
  habitatId: string;
    
  @Column({ name: "date_creation", type: "datetime" })
  dateCreation: Date;
  
  @ManyToOne(() => Breed, (breed) => breed.animals)
  @JoinColumn({ name: "race_id" })
  breed: Breed;

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  @JoinColumn({ name: "habitat_id" })
  habitat: Habitat;

  @OneToMany(() => AnimalImage, (image) => image.animal, { cascade: true })
  images: AnimalImage[];

  @OneToMany(() => VeterinaryReport, (veterinaryReport) => veterinaryReport.animal)
  veterinaryReports: VeterinaryReport[];

  @OneToMany(() => DailyFeed, (dailyFeed) => dailyFeed.animal)
  dailyFeeds: DailyFeed[];
}