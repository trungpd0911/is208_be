import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Class } from "./Class.schema";
import mongoose from "mongoose";

export class Student {
    @Prop({ required: true })
    studentName: string;

    @Prop({ required: true })
    male: boolean;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    })
    class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);