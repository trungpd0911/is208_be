import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
} from 'class-validator';

export class RegisterUserDto {
	@ApiProperty({
		example: 'admin@gmail.com',
	})
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'Nguyen Van A',
	})
	@IsNotEmpty()
	@IsString()
	teacherName: string;

	@ApiProperty({})
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string;
}
