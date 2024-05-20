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
import { CreateHistoryLessonDto } from './dto/create-history-lesson.dto';
import { UpdateHistoryLessonDto } from './dto/update-history-lesson.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('history-lessons')
@ApiTags('History Lessons')
export class HistoryLessonsController {
	constructor(
		private readonly historyLessonsService: HistoryLessonsService,
	) {}

	@Post()
	create(@Body() createHistoryLessonDto: CreateHistoryLessonDto) {
		return this.historyLessonsService.create(createHistoryLessonDto);
	}

	@Get()
	findAll() {
		return this.historyLessonsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.historyLessonsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateHistoryLessonDto: UpdateHistoryLessonDto,
	) {
		return this.historyLessonsService.update(+id, updateHistoryLessonDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.historyLessonsService.remove(+id);
	}
}
