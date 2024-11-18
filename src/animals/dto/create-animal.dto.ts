import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
    @ApiProperty({ maxLength: 50, description: "Prénom de l'animal" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    name: string;

    @ApiProperty({ description: "ID de la race de l'animal", type: 'string' })
    @IsString()
    @IsNotEmpty()
    breedId: string;
    
    @ApiProperty({ description: "ID de l'habitat de l'animal", type: 'string' })
    @IsString()
    @IsNotEmpty()
    habitatId: string;

    @ApiProperty({ description: "Liste des images de l'animal", type: 'array', items: { type: 'string', format: 'binary' } })
    @IsOptional()
    images: any[];
}