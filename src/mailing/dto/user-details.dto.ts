import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDetailsDto {
    @ApiProperty({ description: "ID du nouvel utilisateur", type: 'string' })
    @IsString()
    @IsNotEmpty()
    userId: string;
}