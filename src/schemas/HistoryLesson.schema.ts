import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Lesson } from './Lesson.schema';
import mongoose from 'mongoose';
import { Teacher } from './Teacher.schema';

@Schema({ timestamps: true })
export class HistoryLesson {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lesson',
	})
	lesson: Lesson;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher',
	})
	oldTeacher: Teacher;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher',
	})
	replacedTeacher: Teacher;
}

export const HistoryLessonSchema = SchemaFactory.createForClass(HistoryLesson);
