import { Injectable } from '@nestjs/common';
import { CreateHistoryLessonDto } from './dto/create-history-lesson.dto';
import { UpdateHistoryLessonDto } from './dto/update-history-lesson.dto';

@Injectable()
export class HistoryLessonsService {
	create(createHistoryLessonDto: CreateHistoryLessonDto) {
		return 'This action adds a new historyLesson';
	}

	findAll() {
		return `This action returns all historyLessons`;
	}

	findOne(id: number) {
		return `This action returns a #${id} historyLesson`;
	}

	update(id: number, updateHistoryLessonDto: UpdateHistoryLessonDto) {
		return `This action updates a #${id} historyLesson`;
	}

	remove(id: number) {
		return `This action removes a #${id} historyLesson`;
	}
}
