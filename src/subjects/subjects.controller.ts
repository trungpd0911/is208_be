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
import { CustomSuccessfulApiResponse } from '../global/api-responses';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {
	constructor(private readonly subjectsService: SubjectsService) { }

	// @Post()
	// async create() {
	// 	return await this.subjectsService.create();
	// }

	@CustomSuccessfulApiResponse(200, "get all subjects successfully", [{
		"_id": "66408cd5108e84eabf17dd7d",
		"subjectName": "Hóa"
	}])
	@Get()
	async findAll() {
		return await this.subjectsService.findAll();
	}
}
