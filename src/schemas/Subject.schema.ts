import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Subject {
	@Prop({ required: true })
	subjectName: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
