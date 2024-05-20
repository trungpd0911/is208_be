import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from '../schemas/Teacher.schema';
import mongoose, { Model } from 'mongoose';
import { responseData } from '../global/globalClass';
import data from './data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
	constructor(
		@InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
	) { }

	async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	async comparePassword(password: string, hash: string): Promise<boolean> {
		const checkPassword = await bcrypt.compare(password, hash);
		return checkPassword;
	}
	// write for me a function to change all the password in the database to hash password (12345678) and save 
	async hashAllPassword() {
		try {
			const teachers = await this.teacherModel.find();
			for (let i = 0; i < teachers.length; i++) {
				teachers[i].password = await this.hashPassword('12345678');
				await teachers[i].save();
			}
			return new responseData(null, 200, 'Hash all password successfully');
		} catch (error) {
			throw error;
		}
	}

	async create() {
		try {
			const teacherInput = data.teacherInput;
			for (let i = 0; i < teacherInput.length; i++) {
				await this.teacherModel.create({
					teacherName: teacherInput[i].teacherName,
					email: teacherInput[i].email,
					password: await this.hashPassword(teacherInput[i].password),
				});
			}
			return new responseData(null, 201, 'Teachers created successfully');
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			const teachers = await this.teacherModel.find().select('-__v -createdAt -updatedAt -password');
			return new responseData(teachers, 200, 'get all teacherrs successfully');
		} catch (error) {
			throw error;
		}
	}

	findOne(id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid teacher id');
		}
		try {
			const teacher = this.teacherModel.findOne({ teacherId: id });
			if (!teacher) {
				throw new BadRequestException('Teacher not found');
			}
			return new responseData(teacher, 200, 'get teacher by id successfully');
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, updateTeacherDto: UpdateTeacherDto) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid teacher id');
		}
		try {
			const teacher = await this.teacherModel.findOne({ teacherId: id });
			if (!teacher) {
				throw new BadRequestException('Teacher not found');
			}
			teacher.teacherName = updateTeacherDto.teacherName;
			teacher.email = updateTeacherDto.email;
			await teacher.save();
			return new responseData(null, 200, 'update teacher successfully');
		} catch (error) {
			throw error;
		}
	}

	async remove(id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid teacher id');
		}
		try {
			const teacher = await this.teacherModel.findOne({ teacherId: id });
			if (!teacher) {
				throw new BadRequestException('Teacher not found');
			}
			await this.teacherModel.findByIdAndDelete(teacher._id);
			return new responseData(null, 200, 'remove teacher successfully');
		} catch (error) {
			throw error;
		}

	}

	async findTeacherById(id: string) {
		try {
			const teacher = await this.teacherModel.findById(id);
			if (!teacher) {
				return false;
			}
			return true;
		} catch (error) {
			throw error;
		}
	}
}
