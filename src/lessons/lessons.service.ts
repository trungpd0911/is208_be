import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { lessonData } from './data';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../schemas/Lesson.schema';
import mongoose, { Model } from 'mongoose';
import { responseData } from '../global/globalClass';

@Injectable()
export class LessonsService {
	constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>) {}

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
					});
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
			// console.log(lessonCount, lessonData.length);
			return new responseData(
				lessons,
				200,
				'get all lessons successfully',
			);
		} catch (error) {
			throw error;
		}
	}

	async getAllLessonsByDay(day: Date) {
		try {
			// check if the input is a valid date
			if (!(day instanceof Date)) {
				// "2024-05-27T00:12:12.000Z" => "2024-05-27T12:00:00.000Z"
				day = new Date(day);
			} else {
				throw new BadRequestException('Invalid date');
			}

			if (isNaN(day.getTime())) {
				throw new BadRequestException('Invalid date');
			}
			day = new Date(
				Date.UTC(
					day.getFullYear(),
					day.getMonth(),
					day.getDate(),
					12,
					0,
					0,
				),
			);
			const lessons = await this.lessonModel
				.find({ lessonDate: day })
				.select('-__v -createdAt -updatedAt')
				.populate(
					'teacher',
					'-__v -createdAt -updatedAt -password -mainSubject',
				)
				.populate('class', '-__v -createdAt -updatedAt')
				.populate('subject', '-__v -createdAt -updatedAt -password');
			return new responseData(
				lessons,
				200,
				'get all lessons by day successfully',
			);
		} catch (error) {
			throw error;
		}
	}

	async getAllLessonsByTeacherAndDay(teacherId: string, day: Date) {
		if (!mongoose.Types.ObjectId.isValid(teacherId)) {
			throw new BadRequestException('Invalid teacher id');
		}
		if (!(day instanceof Date)) {
			// "2024-05-27T00:12:12.000Z" => "2024-05-27T12:00:00.000Z"
			day = new Date(day);
		} else {
			throw new BadRequestException('Invalid date');
		}

		if (isNaN(day.getTime())) {
			throw new BadRequestException('Invalid date');
		}
		try {
			day = new Date(
				Date.UTC(
					day.getFullYear(),
					day.getMonth(),
					day.getDate(),
					12,
					0,
					0,
				),
			);
			const lessons = await this.lessonModel
				.find({ lessonDate: day, teacher: teacherId })
				.select('-__v -createdAt -updatedAt')
				.populate(
					'teacher',
					'-__v -createdAt -updatedAt -password -mainSubject',
				)
				.populate('class', '-__v -createdAt -updatedAt')
				.populate('subject', '-__v -createdAt -updatedAt -password');
			return new responseData(
				lessons,
				200,
				'get all lesson in a day of a teacher successfully',
			);
		} catch (error) {
			throw error;
		}
	}

	async commentLesson(lessonId: string, comment: string, teacherId: string) {
		if (!mongoose.Types.ObjectId.isValid(lessonId)) {
			throw new BadRequestException('Invalid lesson id');
		}
		try {
			const lesson = await this.lessonModel.findById(lessonId);
			if (!lesson) {
				throw new BadRequestException('Lesson not found');
			}
			if (lesson.teacher.toString() !== teacherId) {
				throw new ForbiddenException(
					'You are not the teacher of this lesson',
				);
			}
			lesson.comment = comment;
			await lesson.save();
			return new responseData(null, 200, 'comment lesson successfully');
		} catch (error) {
			throw error;
		}
	}
}
