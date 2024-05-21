import { Module } from '@nestjs/common';
import { HistoryLessonsService } from './history-lessons.service';
import { HistoryLessonsController } from './history-lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from '../schemas/Lesson.schema';
import { Teacher, TeacherSchema } from '../schemas/Teacher.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Lesson.name,
				schema: LessonSchema,
			},
			{
				name: Teacher.name,
				schema: TeacherSchema,
			}
		])
	],
	controllers: [HistoryLessonsController],
	providers: [HistoryLessonsService],
})
export class HistoryLessonsModule {}
