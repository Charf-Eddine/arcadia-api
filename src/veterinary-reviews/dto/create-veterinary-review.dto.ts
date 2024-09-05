import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVeterinaryReviewDto {
    @ApiProperty({ description: "ID du vétérinaire", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: "ID de l'habitat", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    habitatId: number;

    @ApiProperty({ description: "Date", type: 'string', format: 'date-time' })
    @IsString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: "Commentaire" })
    @IsNotEmpty()
    @IsString()
    comment: string;
}
