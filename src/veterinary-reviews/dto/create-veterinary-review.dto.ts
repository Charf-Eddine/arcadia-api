import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVeterinaryReviewDto {
    @ApiProperty({ description: "ID du vétérinaire", type: 'string' })
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @ApiProperty({ description: "ID de l'habitat", type: 'string' })
    @IsString()
    @IsNotEmpty()
    habitatId: string;
        
    @ApiProperty({ description: "Date", type: 'string', format:'date-time' })
    @IsString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: "Commentaire" })
    @IsNotEmpty()
    @IsString()
    comment: string;
}