import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({ maxLength: 50, description: "Nom du service" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    name: string;

    @ApiProperty({ description: "Description du service" })
    @IsNotEmpty()
    @IsString()
    description: string;
}
