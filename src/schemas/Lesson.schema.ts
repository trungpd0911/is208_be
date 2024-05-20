import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subject } from './Subject.schema';
import mongoose from 'mongoose';
import { Teacher } from './Teacher.schema';
import { Class } from './Class.schema';
import { Student } from './Student.schema';

@Schema({ timestamps: true })
export class Lesson {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subject',
	})
	subject: Subject;

	@Prop({ required: true })
	lessonNum: number;
	
	@Prop({ required: true })
	lessonDayInWeek: number;

	@Prop({ required: true })
	lessonDate: Date;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher',
	})
	teacher: Teacher;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Class',
	})
	class: Class;

	@Prop({
		required: false,
		default: '',
	})
	comment: string;

	@Prop({
		required: false,
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
		default: [],
	})
	offStudent: Student[];

	@Prop({ required: true, default: false })
	status: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
