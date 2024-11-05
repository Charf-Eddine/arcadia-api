import { Inject, Injectable } from '@nestjs/common';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { DataSource } from 'typeorm';
import { Habitat } from './entities/habitat.entity';
import { HabitatImage } from './entities/habitat-image.entity';
import * as fs from 'fs';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class HabitatsService {
  constructor(
    @Inject("DATA_SOURCE")
    private dataSource: DataSource,
    private filesService: FilesService,
  ) {}
  
  async create(createHabitatDto: CreateHabitatDto): Promise<Habitat> {
    let filenames = [];
    if (createHabitatDto.images && createHabitatDto.images.length > 0) {
      for(let image of createHabitatDto.images) {
        filenames.push(await this.filesService.uploadImage(image));
      }
    }

    const habitat = this.dataSource.getRepository(Habitat).create({
      name: createHabitatDto.name,
      description: createHabitatDto.description,
      images: filenames.map(filename => {
        return this.dataSource.getRepository(HabitatImage).create({ 
          filename: filename
        });
      }),
    });

    return this.dataSource.getRepository(Habitat).save(habitat);
  }

  async findAll(): Promise<Habitat[]> {
    return await this.dataSource
      .getRepository(Habitat)
      .createQueryBuilder('habitat')
      .leftJoinAndSelect('habitat.images', 'images')
      .leftJoin('habitat.animals', 'animals')
      .addSelect(["animals.id", "animals.name"])
      .getMany();
  }

  async findOne(id: number): Promise<Habitat> {
    return await this.dataSource
      .getRepository(Habitat)
      .createQueryBuilder('habitat')
      .leftJoinAndSelect('habitat.images', 'images')
      .leftJoinAndSelect('habitat.animals', 'animals')
      .where("habitat.id = :id", { id: id })
      .getOne();
  }

  async update(id: number, updateHabitatDto: UpdateHabitatDto): Promise<Habitat> {
    const habitat = await this.findOne(id);

    if (!habitat) {
      throw new Error('Habitat not found');
    }
  
    // Mettre à jour les propriétés de l'habitat
    this.dataSource.getRepository(Habitat).merge(habitat, updateHabitatDto);
  
    // Supprimer les anciennes images
    if (habitat.images && habitat.images.length > 0) {
      for (let image of habitat.images) {
        if (image && image.filename) {
          const filePath = `./uploads/${image.filename}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          this.dataSource.getRepository(HabitatImage).remove(image);  
        }
      }
    }

    // Ajouter les nouvelles images
    if (updateHabitatDto.images  && updateHabitatDto.images.length > 0) {  
      let filenames = [];
      if (updateHabitatDto.images && updateHabitatDto.images.length > 0) {
        for(let image of updateHabitatDto.images) {
          filenames.push(await this.filesService.uploadImage(image));
        }
      }
  
      habitat.images = filenames.map(filename => {
        return this.dataSource.getRepository(HabitatImage).create({ 
          filename: filename
        });
      });
    }
  
    return this.dataSource.getRepository(Habitat).save(habitat);
  }

  async remove(id: number): Promise<void> {
    const habitat = await this.findOne(id);
    if (habitat) {
      habitat.images.forEach(image => {
        fs.unlinkSync(`./uploads/${image.filename}`);
      });
      await this.dataSource.getRepository(Habitat).remove(habitat);
    }
  }
}