import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('signup')
    signUp(
        @Body() signUpDto: AuthCredentialsDto
    ): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('signin')
    signIn(
        @Body() signInUserDto: AuthCredentialsDto
    ): Promise<{accessToken: string}> {
        return this.authService.signIn(signInUserDto);
    }
}
