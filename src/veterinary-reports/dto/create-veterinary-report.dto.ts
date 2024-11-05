import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateVeterinaryReportDto {
    @ApiProperty({ description: "ID du vétérinaire", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    
    @ApiProperty({ description: "ID de l'animal", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    animalId: number;
        
    @ApiProperty({ description: "Date du passage", type: 'string', format:'date-time' })
    @IsString()
    @IsNotEmpty()
    passageDate: Date;

    @ApiProperty({ maxLength: 50, description: "Etat de l'animal" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    state: string;

    @ApiProperty({ maxLength: 50, description: "Nourriture" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    food: string;

    @ApiProperty({ description: "Grammage de la nourriture" })
    @IsNotEmpty()
    @IsNumber()
    foodWeight: number;

    @ApiProperty({ description: "Détail de l'état de l'animal" })
    @IsOptional()
    @IsString()
    stateDetail: string;
}