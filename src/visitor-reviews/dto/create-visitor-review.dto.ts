import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateVisitorReviewDto {
    @ApiProperty({ maxLength: 50, description: "Pseudonyme du visiteur" })
    @IsNotEmpty()
    @IsString()
    @Length(0, 50)
    pseudo: string;

    @ApiProperty({ maxLength: 255, description: "Commentaure du visiteur" })
    @IsNotEmpty()
    @IsString()
    comment: string;

    @ApiProperty({ description: "Avis visible ou non" })
    @IsOptional()
    @IsBoolean()
    isVisible!: boolean;
}
