import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./auth.entity";
import { Repository } from "typeorm";
import { JWTPayload } from "./jwt_payload.interface";
import { UnauthorizedException } from "@nestjs/common";

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: 'imtuda4test',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JWTPayload): Promise<User> {
        const {username} = payload;
        const user = await this.userRepository.findOneBy({username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}