import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ maxLength: 100, description: "Email pour l'authentification" })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({ maxLength: 50, description: "Mot de passe pour l'authentification" })
  @IsNotEmpty()
  @IsString()
  password: string;
}