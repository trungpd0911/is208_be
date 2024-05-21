import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { HistoryLessonsService } from './history-lessons.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('history-lessons')
@ApiTags('History Lessons')
export class HistoryLessonsController {
	constructor(
		private readonly historyLessonsService: HistoryLessonsService,
	) {}
}
