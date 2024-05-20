import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTeacherDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    teacherName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
}
