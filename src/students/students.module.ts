import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schemas/Student.schema';
import { Class, ClassSchema } from '../schemas/Class.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Student.name,
				schema: StudentSchema,
			},
			{
				name: Class.name,
				schema: ClassSchema,
			}
		])
	],
	controllers: [StudentsController],
	providers: [StudentsService],
})
export class StudentsModule { }
