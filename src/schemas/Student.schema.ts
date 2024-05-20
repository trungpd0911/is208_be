import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from './Class.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Student {
	@Prop({ required: true })
	studentName: string;

	@Prop({ required: true })
	male: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Class',
	})
	class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
