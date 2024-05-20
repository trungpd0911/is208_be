import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	className: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	formTeacher: string;
}
