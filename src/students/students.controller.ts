import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) { }

	@Post()
	create(@Body() createStudentDto: CreateStudentDto) {
		return this.studentsService.create(createStudentDto);
	}

	@Get()
	findAll() {
		return this.studentsService.findAll();
	}

	// @Post('/fakedata/create')
	// async createFakeData() {
	// 	return await this.studentsService.createFakeData();
	// }

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.studentsService.findOne(+id);
	}
}
