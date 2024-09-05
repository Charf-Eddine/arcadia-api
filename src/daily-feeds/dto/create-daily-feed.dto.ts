import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateDailyFeedDto {
    @ApiProperty({ description: "ID de l'employé", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: "ID de l'animal", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @ApiProperty({ description: "Date du passage", type: 'string', format: 'date-time' })
    @IsString()
    @IsNotEmpty()
    passageDate: Date;

    @ApiProperty({ maxLength: 50, description: "Nourriture" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    food: string;

    @ApiProperty({ description: "Grammage de la nourriture" })
    @IsNotEmpty()
    @IsNumber()
    foodWeight: number;
}
