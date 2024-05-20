import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomBadRequestApiResponse, CustomSuccessfulApiResponse } from '../global/api-responses';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) { }

	// @Post()
	// async create() {
	// 	return await this.teachersService.create();
	// }

	@Get()
	async findAll() {
		return await this.teachersService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.teachersService.findOne(id);
	}

	@CustomSuccessfulApiResponse(200, 'update teacher successfully', null)
	@CustomBadRequestApiResponse('Teacher not found')
	@Patch(':id')
	@HttpCode(200)
	async update(
		@Param('id') id: string,
		@Body() updateTeacherDto: UpdateTeacherDto,
	) {
		return await this.teachersService.update(id, updateTeacherDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.teachersService.remove(id);
	}
}
