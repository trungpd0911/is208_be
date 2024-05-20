import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from '../schemas/Class.schema';
import mongoose, { Model } from 'mongoose';
import { TeachersService } from '../teachers/teachers.service';
import { responseData } from '../global/globalClass';
import { classData } from './data';
import { Student } from '../schemas/Student.schema';

@Injectable()
export class ClassesService {
	constructor(
		@InjectModel(Class.name) private classModel: Model<Class>,
		@InjectModel(Student.name) private studentModel: Model<Student>,
		private teacherService: TeachersService,
	) { }

	async create(createClassDto: CreateClassDto) {
		try {
			const teacherId = createClassDto.formTeacher;
			const teacher = await this.teacherService.findTeacherById(teacherId);
			if (!teacher) {
				throw new BadRequestException('Teacher not found');
			}
			const newClass = new this.classModel(createClassDto);
			await newClass.save();
			return new responseData(null, 201, 'Class created successfully');
		} catch (error) {
			throw error;
		}
	}

	async createFakeData() {
		try {
			for (let i = 0; i < classData.length; i++) {
				const teacherId = classData[i].formTeacher;
				const teacher = await this.teacherService.findTeacherById(teacherId);
				if (!teacher) {
					console.log(teacherId);
					throw new BadRequestException('Teacher not found');
				}
				const newClass = new this.classModel(classData[i]);
				await newClass.save();
			}
			return new responseData(null, 201, 'Classes created successfully');
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			const classes = await this.classModel.find();
			return new responseData(classes, 200, 'Classes fetched successfully');
		} catch (error) {
			throw error;
		}
	}

	async getAllStudentsOfClass(id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid class id');
		}
		try {
			const classFound = await this.classModel.findById(id);
			if (!classFound) {
				throw new BadRequestException('Class not found');
			}
			const students = await this.studentModel.find({ class: id });
			// const students = await this.classModel.findById(id).populate('students');
			return new responseData(students, 200, 'Students fetched successfully');
		} catch (error) {
			throw error;
		}
	}
}
