import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { CustomSuccessfulApiResponse } from '../global/api-responses';

@Controller('classes')
@ApiTags('classes')
export class ClassesController {
	constructor(private readonly classesService: ClassesService) {}

	// @Post()
	// async create(@Body() createClassDto: CreateClassDto) {
	//   return await this.classesService.create(createClassDto);
	// }

	// @Post('/fakedata/create')
	// async createFakeData() {
	//   return await this.classesService.createFakeData();
	// }

	@CustomSuccessfulApiResponse(200, 'get all classes successfully', [
		{
			_id: '6640a28da89d08e787ff0e8f',
			className: '10A1',
			formTeacher: '6640a207929a820bc54517d0',
		},
	])
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get()
	async findAll() {
		return await this.classesService.findAll();
	}

	@CustomSuccessfulApiResponse(
		200,
		'get all students of class successfully',
		[
			{
				_id: '6640a312f89cd636a9829102',
				studentName: 'Bùi Hải An',
				male: 'Nam',
				class: {
					_id: '6640a28da89d08e787ff0e8f',
					className: '10A1',
					formTeacher: '6640a207929a820bc54517d0',
				},
			},
		],
	)
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get('/:id/students')
	async getAllStudentsOfClass(@Param('id') id: string) {
		return await this.classesService.getAllStudentsOfClass(id);
	}
}
