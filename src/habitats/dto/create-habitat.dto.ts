import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

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
}
