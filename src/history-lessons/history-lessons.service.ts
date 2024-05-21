import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../schemas/Lesson.schema';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/Teacher.schema';

@Injectable()
export class HistoryLessonsService {
    constructor(
        @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    ) {}
}
