import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject } from 'rxjs';
import { SubjectSchema } from '../schemas/Subject.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Subject.name,
				schema: SubjectSchema,
			}
		])
	],
	controllers: [SubjectsController],
	providers: [SubjectsService],
})
export class SubjectsModule {}
