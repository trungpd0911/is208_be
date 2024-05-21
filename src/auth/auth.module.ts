import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../schemas/Teacher.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Teacher.name,
				schema: TeacherSchema,
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
