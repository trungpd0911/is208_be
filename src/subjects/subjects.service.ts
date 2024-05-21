import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from '../schemas/Subject.schema';
import { Model } from 'mongoose';
import { subjectData } from './data';
import { responseData } from '../global/globalClass';

@Injectable()
export class SubjectsService {
	constructor(
		@InjectModel(Subject.name) private subjectModel: Model<Subject>,
	) { }
	async create() {
		try {
			await this.subjectModel.deleteMany({});
			await this.subjectModel.insertMany(subjectData);
			return 'Subjects have been added';
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {

			const allSubjects = await this.subjectModel.find().select("-__v -createdAt -updatedAt");
			return new responseData(allSubjects, 200, 'get all subjects successfully');
		} catch (error) {
			throw error;
		}
	}
}
