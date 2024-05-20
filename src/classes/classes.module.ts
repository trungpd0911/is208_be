import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from '../schemas/Class.schema';
import { TeachersModule } from '../teachers/teachers.module';
import { Student, StudentSchema } from '../schemas/Student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
      {
        name: Student.name,
        schema: StudentSchema,
      }
    ]),
    TeachersModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule { }
