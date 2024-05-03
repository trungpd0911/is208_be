import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Subject } from "./Subject.schema";

export class Teacher {
    @Prop({ required: true })
    teacherName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    })
    mainSubject: Subject;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher); 