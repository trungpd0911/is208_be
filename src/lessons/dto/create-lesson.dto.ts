import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
	@IsNotEmpty()
	@IsString()
	subject: string;

	@IsNotEmpty()
	@IsString()
	lessonNum: number;

	@IsNotEmpty()
	@IsString()
	lessonDate: Date;

	@IsNotEmpty()
	@IsString()
	teacher: string;

	@IsNotEmpty()
	@IsString()
	class: string;

	@IsString()
	comment: string;

	offStudent: string[];
}
