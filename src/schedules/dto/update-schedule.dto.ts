import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateScheduleDto {
    @ApiProperty({ description: "Heure d'ouverture" })
    @IsString()
    @IsOptional()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'L\'heure d\'ouverture doit être au format HH:MM, par exemple 10:45 ou 23:59',
    })
    opening: string;

    @ApiProperty({ description: "Heure de fermeture" })
    @IsString()
    @IsOptional()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'L\'heure de fermeture doit être au format HH:MM, par exemple 10:45 ou 23:59',
    })
    closing: string;
}