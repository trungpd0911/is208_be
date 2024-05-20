import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Subject } from './Subject.schema';

@Schema({ timestamps: true })
export class Teacher {
	@Prop({ required: true })
	teacherName: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: false })
	phoneNumber: string;

	@Prop({
		required: false,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subject',
	})
	mainSubject: Subject;

	@Prop({
		required: true,
		default: 'user',
	})
	role: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
