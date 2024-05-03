import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class Subject {
    @Prop({ required: true })
    subjectName: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);