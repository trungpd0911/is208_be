import { Controller, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	// @Post('/fakedata/create')
	// async createFakeData() {
	// 	return await this.studentsService.createFakeData();
	// }
}
