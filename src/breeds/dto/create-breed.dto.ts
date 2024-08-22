import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBreedDto {
    @ApiProperty({ maxLength: 50, description: "Nom de la race" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    name: string;
}
