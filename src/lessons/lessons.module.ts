import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from '../schemas/Lesson.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Lesson.name,
				schema: LessonSchema,
			},
		]),
	],
	controllers: [LessonsController],
	providers: [LessonsService],
})
export class LessonsModule {}
