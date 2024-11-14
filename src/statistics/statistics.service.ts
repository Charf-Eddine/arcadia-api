import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animals.schema';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async incrementConsultation(name: string): Promise<Animal> {
    // Recherche de l'animal par son nom
    let animal = await this.animalModel.findOne({ name });

    // Si l'animal n'existe pas, on le crée avec consultationCount = 1
    if (!animal) {
      animal = new this.animalModel({ name, consultationCount: 1 });
      return animal.save();
    }

    // Si l'animal existe, on incrémente consultationCount
    animal.consultationCount += 1;
    return animal.save();
  }

  async getMostPopularAnimals(): Promise<Animal[]> {
    return this.animalModel.find().sort({ consultationCount: -1 }).exec();
  }
}