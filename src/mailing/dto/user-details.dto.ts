import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UserDetailsDto {
    @ApiProperty({ description: "ID du nouvel utilisateur", type: 'number' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}