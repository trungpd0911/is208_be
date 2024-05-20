import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { lessonData } from './data';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../schemas/Lesson.schema';
import { Model } from 'mongoose';
import { responseData } from '../global/globalClass';

@Injectable()
export class LessonsService {
	constructor(
		@InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
	) { }

	create(createLessonDto: CreateLessonDto) {
		return 'This action adds a new lesson';
	}

	async createAll() {
		try {
			await Promise.all(
				lessonData.map(async (lesson) => {
					await this.lessonModel.create({
						subject: lesson.subject,
						lessonNum: lesson.lessonNum,
						lessonDayInWeek: lesson.lessonDayInWeek,
						lessonDate: lesson.lessonDate,
						teacher: lesson.teacher,
						class: lesson.class,
						offStudent: lesson.offStudent,
						status: lesson.status,
					})
				}),
			);
			return new responseData(null, 201, 'Lessons created successfully');
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			const lessons = await this.lessonModel.find();
			// const lessonCount = await this.lessonModel.countDocuments();
			return new responseData(lessons , 200, 'Lessons fetched successfully');
		} catch (error) {
			throw error;
		}
	}
}
