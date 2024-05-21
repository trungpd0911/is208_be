import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UseGuards,
	Request,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
	CustomBadRequestApiResponse,
	CustomSuccessfulApiResponse,
} from '../global/api-responses';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	// @Post()
	// async create() {
	// 	return await this.teachersService.create();
	// }

	@ApiBearerAuth()
	@CustomSuccessfulApiResponse(200, 'get all teachers successfully', [
		{
			_id: '6640a207929a820bc54517d0',
			teacherName: 'Phan Đình Thế Trung',
			email: 'phandinhthetrung@gmail.com',
			mainSubject: '66408cd5108e84eabf17dd7b',
			role: 'user',
		},
	])
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	@Get()
	async findAll() {
		return await this.teachersService.findAll();
	}

	@CustomSuccessfulApiResponse(200, 'get current teacher successfully', {
		_id: '6640a207929a820bc54517d0',
		teacherName: 'Phan Đình Thế Trung',
		email: 'phandinhthetrung@gmail.com',
		mainSubject: '66408cd5108e84eabf17dd7b',
		role: 'user',
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get('/currentTeacher')
	async getCurrentTeacher(@Request() req) {
		const id = req.currentUser._id;
		return await this.teachersService.getCurrentTeacher(id);
	}

	@ApiBearerAuth()
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	@CustomSuccessfulApiResponse(200, 'get teacher by id successfully', {
		_id: '6640a207929a820bc54517d0',
		teacherName: 'Phan Đình Thế Trung',
		email: 'phandinhthetrung@gmail.com',
		mainSubject: '66408cd5108e84eabf17dd7b',
		role: 'user',
	})
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.teachersService.findOne(id);
	}

	@CustomSuccessfulApiResponse(200, 'update teacher successfully', null)
	@CustomBadRequestApiResponse('Teacher not found')
	@Patch(':id')
	@HttpCode(200)
	@ApiBearerAuth()
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	async update(
		@Param('id') id: string,
		@Body() updateTeacherDto: UpdateTeacherDto,
	) {
		return await this.teachersService.update(id, updateTeacherDto);
	}

	@ApiBearerAuth()
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	@CustomSuccessfulApiResponse(200, 'delete teacher successfully', null)
	@CustomBadRequestApiResponse('Teacher not found')
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.teachersService.remove(id);
	}
}
