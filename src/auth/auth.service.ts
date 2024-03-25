import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './jwt_payload.interface';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.userRepository.create({ username, password: hashedPassword });
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(signInUserDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = signInUserDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JWTPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            
            return { accessToken };
        } else {
            throw new UnauthorizedException('username or password is incorrect')
        }
    }
}
