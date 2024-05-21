import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomBadRequestApiResponse, CustomForbidenrrorApiResponse, CustomSuccessfulApiResponse } from '../global/api-responses';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
	constructor(private readonly lessonsService: LessonsService) { }

	// @Post('/create/all')
	// async createAll() {
	// 	return await this.lessonsService.createAll();
	// }

	@ApiBearerAuth()
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	@CustomSuccessfulApiResponse(200, "get all lessons successfully", [{
		"_id": "664c5ead77ba18d14729c7bb",
		"subject": {
			"_id": "66408cd5108e84eabf17dd7d",
			"subjectName": "Hóa"
		},
		"lessonNum": 4,
		"lessonDayInWeek": 2,
		"lessonDate": "2024-05-27T12:00:00.000Z",
		"teacher": {
			"_id": "6640a208929a820bc54517d4",
			"teacherName": "Vũ Tiến Đạt",
			"email": "vutiendat@gmail.com",
			"role": "user"
		},
		"class": {
			"_id": "6640a28da89d08e787ff0e8f",
			"className": "10A1",
			"formTeacher": "6640a207929a820bc54517d0"
		},
		"comment": "",
		"offStudent": [],
		"status": false
	}])
	@Get()
	async findAll() {
		return await this.lessonsService.findAll();
	}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				day: {
					type: 'string',
					example: '2024-05-17T00:00:00.000Z',
				},
			},
		},
	})
	@CustomSuccessfulApiResponse(200, "get all lessons by day successfully", [{
		"_id": "664c5ead77ba18d14729c7bb",
		"subject": {
			"_id": "66408cd5108e84eabf17dd7d",
			"subjectName": "Hóa"
		},
		"lessonNum": 4,
		"lessonDayInWeek": 2,
		"lessonDate": "2024-05-27T12:00:00.000Z",
		"teacher": {
			"_id": "6640a208929a820bc54517d4",
			"teacherName": "Vũ Tiến Đạt",
			"email": "vutiendat@gmail.com",
			"role": "user"
		},
		"class": {
			"_id": "6640a28da89d08e787ff0e8f",
			"className": "10A1",
			"formTeacher": "6640a207929a820bc54517d0"
		},
		"comment": "",
		"offStudent": [],
		"status": false
	}])
	@CustomBadRequestApiResponse("Invalid date")
	@ApiBearerAuth()
	@UseGuards(new RoleGuard(['admin']))
	@UseGuards(AuthGuard)
	@Get('/day')
	async getAllLessonsByDay(
		@Body('day') day: Date
	) {
		// the input will be day: '2021-09-01T00:00:00.000Z'
		return await this.lessonsService.getAllLessonsByDay(day);
	}

	// get all lessons of a teacher by teacherId and day
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				day: {
					type: 'string',
					example: '2024-05-17T00:00:00.000Z',
				},
			},
		},
	})
	@CustomSuccessfulApiResponse(200, "get all lesson in a day of a teacher successfully", [{
		"_id": "664c5ead77ba18d14729c7bb",
		"subject": {
			"_id": "66408cd5108e84eabf17dd7d",
			"subjectName": "Hóa"
		},
		"lessonNum": 4,
		"lessonDayInWeek": 2,
		"lessonDate": "2024-05-27T12:00:00.000Z",
		"teacher": {
			"_id": "6640a208929a820bc54517d4",
			"teacherName": "Vũ Tiến Đạt",
			"email": "vutiendat@gmail.com",
			"role": "user"
		},
		"class": {
			"_id": "6640a28da89d08e787ff0e8f",
			"className": "10A1",
			"formTeacher": "6640a207929a820bc54517d0"
		},
		"comment": "",
		"offStudent": [],
		"status": false
	}])
	@CustomBadRequestApiResponse("Invalid date")
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get('/allLessonOfDay')
	async getAllLessonsByTeacherAndDay(
		@Request() req,
		@Body('day') day: Date
	) {
		const teacherId = req.currentUser._id;
		return await this.lessonsService.getAllLessonsByTeacherAndDay(teacherId, day);
	}

	// nhan xet buoi hoc
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				comment: {
					type: 'string',
					example: 'Lớp học vắng nhiều do dịch bệnh',
				},
			},
		},
	})
	@CustomSuccessfulApiResponse(200, "comment lesson successfully", null)
	@CustomBadRequestApiResponse("Invalid lesson id")
	@CustomForbidenrrorApiResponse("you are not the teacher of this lesson")
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Post('/:lessonId/comment')
	async commentLesson(
		// @Resquest
		@Request() req,
		@Param('lessonId') lessonId: string,
		@Body('comment') comment: string
	) {
		const teacherId = req.currentUser._id;
		return await this.lessonsService.commentLesson(lessonId, comment, teacherId);
	}

}
