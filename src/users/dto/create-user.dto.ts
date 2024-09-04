import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { UserRoleType } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({ maxLength: 50, description: "Prénom de l'utilisateur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    firstname: string;

    @ApiProperty({ maxLength: 50, description: "Nom de l'utilisateur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    lastname: string;

    @ApiProperty({ maxLength: 50, description: "Pseudo de l'utilisateur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    username: string;

    @ApiProperty({ maxLength: 50, description: "mot de passe de l'utilisateur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    password: string;

    @ApiProperty({ maxLength: 100, description: "email  de l'utilisateur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    email: string;

    @ApiProperty({ description: "Rôle de l'utilisateur", enum: ["admin", "employee", "veterinarian"] })
    @IsEnum(["admin", "employee", "veterinarian"])
    role: UserRoleType
}
