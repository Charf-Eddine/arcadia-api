import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateHabitatDto {
    @ApiProperty({ maxLength: 50, description: "Nom de l'habitat" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    name: string;

    @ApiProperty({ minLength: 255, description: "Description de l'habitat" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    description: string;

    @ApiProperty({ description: "Liste des images de l'habitat", type: 'array', items: { type: 'string', format: 'binary' } })
    @IsOptional()
    images: any[];
}
