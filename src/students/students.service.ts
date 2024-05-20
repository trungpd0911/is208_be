import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { stuData } from './data';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schemas/Student.schema';
import { Model } from 'mongoose';
import { responseData } from '../global/globalClass';
import { Class } from '../schemas/Class.schema';

@Injectable()
export class StudentsService {
	constructor(
		@InjectModel(Student.name) private studentModel: Model<Student>,
		@InjectModel(Class.name) private classModel: Model<Class>,
	) { }

	create(createStudentDto: CreateStudentDto) {
		return 'This action adds a new student';
	}

	async createFakeData() {
		try {
			for (let i = 0; i < stuData.length; i++) {
				const classId = stuData[i].class;
				const classData = await this.classModel.findById(classId);
				if (!classData) {
					console.log(classId);
					throw new BadRequestException('Class not found');
				}
				const student = new this.studentModel(stuData[i]);
				await student.save();
			}
			return new responseData(null, 201, 'Fake data created successfully');
		} catch (error) {
			throw error;
		}
	}

	findAll() {
		return `This action returns all students`;
	}

	findOne(id: number) {
		return `This action returns a #${id} student`;
	}
}
