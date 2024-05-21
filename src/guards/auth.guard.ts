import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		try {
			const token = request.headers.authorization.split(' ')[1];

			if (!token) {
				throw new UnauthorizedException('Invalid token or expired');
			}

			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('JWT_SECRET'),
			});
			request.currentUser = payload;
		} catch (error) {
			throw new UnauthorizedException('Invalid token or expired');
		}
		return true;
	}
}
