import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { DataSource } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { AnimalImage } from './entities/animal-image.entity';
import { FilesService } from 'src/files/files.service';
import * as fs from 'fs';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
    private filesService: FilesService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    let filenames = [];
    if (createAnimalDto.images && createAnimalDto.images.length > 0) {
      for(let image of createAnimalDto.images) {
        filenames.push(await this.filesService.uploadImage(image));
      }
    }

    const name = createAnimalDto.name;
    // Convertir breedId et habitatId en nombres
     const breedId = parseInt(createAnimalDto.breedId, 10);
     const habitatId = parseInt(createAnimalDto.habitatId, 10);

     if (isNaN(breedId) || isNaN(habitatId)) {
         throw new Error('Invalid breedId or habitatId');
     }

     const createAnimal = {
        name,
        breedId,
        habitatId
     };

    const animal = this.dataSource.getRepository(Animal).create({
      name: createAnimalDto.name,
      breedId: parseInt(createAnimalDto.breedId, 10),
      habitatId: parseInt(createAnimalDto.habitatId, 10),
      images: filenames.map(filename => {
        return this.dataSource.getRepository(AnimalImage).create({ 
          filename: filename
        });
      }),
    });

    return this.dataSource.getRepository(Animal).save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.dataSource
      .getRepository(Animal)
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.breed', 'breed')
      .leftJoin('animal.habitat', 'habitat')
      .addSelect(["habitat.id", "habitat.name"])
      .leftJoinAndSelect('animal.images', 'images')
      .getMany();
  }

  async findOne(id: number): Promise<Animal> {
    return await this.dataSource
      .getRepository(Animal)
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.breed', 'breed')
      .leftJoin('animal.habitat', 'habitat')
      .addSelect(["habitat.id", "habitat.name"])
      .leftJoinAndSelect('animal.images', 'images')
      .leftJoinAndSelect('animal.veterinaryReports', 'veterinaryReports')      
      .where("animal.id = :id", { id: id })
      .orderBy('veterinaryReports.passageDate', 'DESC') // Tri par date décroissante pour obtenir le plus récent en premier
      .limit(1) // Limiter à un seul résultat
      .getOne();
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const animal = await this.findOne(id);
    console.log(animal)
    console.log("=================")

    if (!animal) {
      throw new Error('Animal not found');
    }

    delete animal.breed;
    delete animal.habitat;

    const name = updateAnimalDto.name;
    // Convertir breedId et habitatId en nombres
     const breedId = parseInt(updateAnimalDto.breedId, 10);
     const habitatId = parseInt(updateAnimalDto.habitatId, 10);

     if (isNaN(breedId) || isNaN(habitatId)) {
         throw new Error('Invalid breedId or habitatId');
     }

     const updatedAnimal = {
        name,
        breedId,
        habitatId
     };
  
    // Mettre à jour les propriétés de l'animal
    this.dataSource.getRepository(Animal).merge(animal, updatedAnimal);
  
    // Supprimer les anciennes images
    if (animal.images && animal.images.length > 0) {
      for (let image of animal.images) {
        if (image && image.filename) {
          const filePath = `./uploads/${image.filename}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          this.dataSource.getRepository(AnimalImage).remove(image);  
        }
      }
    }

    // Ajouter les nouvelles images
    if (updateAnimalDto.images  && updateAnimalDto.images.length > 0) {  
      let filenames = [];
      if (updateAnimalDto.images && updateAnimalDto.images.length > 0) {
        for(let image of updateAnimalDto.images) {
          filenames.push(await this.filesService.uploadImage(image));
        }
      }
  
      animal.images = filenames.map(filename => {
        return this.dataSource.getRepository(AnimalImage).create({ 
          filename: filename
        });
      });
    }
  
    return this.dataSource.getRepository(Animal).save(animal);
  }

  async remove(id: number): Promise<void> {
    const animal = await this.findOne(id);
    if (animal) {
      animal.images.forEach(image => {
        fs.unlinkSync(`./uploads/${image.filename}`);
      });
      await this.dataSource.getRepository(Animal).remove(animal);
    }
  }
}