import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
	constructor(private readonly subjectsService: SubjectsService) {}

	@Post()
	async create() {
		return await this.subjectsService.create();
	}

	@Get()
	async findAll() {
		return await this.subjectsService.findAll();
	}
}
