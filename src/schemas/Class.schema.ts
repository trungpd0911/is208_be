import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Teacher } from "./Teacher.schema";
import mongoose from "mongoose";

export class Class {
    @Prop({ required: true })
    className: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    })
    formTeacher: Teacher;
}

export const ClassSchema = SchemaFactory.createForClass(Class);