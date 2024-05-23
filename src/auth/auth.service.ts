import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from '../schemas/Teacher.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { responseData } from '../global/globalClass';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
		private jwtService: JwtService,
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

	private async generateAccessToken(payload: any): Promise<string> {
		const accessToken = await this.jwtService.signAsync(payload);
		return accessToken;
	}

	async register(registerUser: RegisterUserDto) {
		try {
			const { email, password, teacherName } = registerUser;
			const checkUserExist = await this.teacherModel.findOne({
				email: email,
			});
			if (checkUserExist) {
				throw new BadRequestException('User already exist');
			}
			const hash = await this.hashPassword(password);
			const newTeacher = new this.teacherModel({
				email,
				password: hash,
				teacherName,
			});

			await newTeacher.save();
			return new responseData(null, 201, 'User created successfully');
		} catch (error) {
			throw error;
		}
	}

	async login(loginUser: LoginUserDto) {
		try {
			const checkUser = await this.teacherModel
				.findOne({
					email: loginUser.email,
				})
				.select('-__v -createdAt -updatedAt');
			if (!checkUser) {
				throw new BadRequestException('wrong email or password');
			}
			const checkPassword = bcrypt.compareSync(
				loginUser.password,
				checkUser.password,
			);
			if (!checkPassword) {
				throw new BadRequestException('wrong email or password');
			}
			const { password, ...user } = checkUser.toObject();
			const accessToken = await this.generateAccessToken(user);
			return new responseData({ accessToken }, 200, 'Login successfully');
		} catch (error) {
			throw error;
		}
	}

	async adminLogin(loginUser: LoginUserDto) {
		try {
			const checkUser = await this.teacherModel.findOne({
				email: loginUser.email,
			});
			if (!checkUser) {
				throw new UnauthorizedException('wrong email or password');
			}
			const checkPassword = bcrypt.compareSync(
				loginUser.password,
				checkUser.password,
			);
			if (!checkPassword) {
				throw new UnauthorizedException('wrong email or password');
			}
			if (checkUser.role !== 'admin') {
				throw new ForbiddenException("you don't have permission");
			}
			const { password, ...user } = checkUser.toObject();
			const accessToken = await this.generateAccessToken(user);
			return new responseData({ accessToken }, 200, 'Login successfully');
		} catch (error) {
			throw error;
		}
	}
}
