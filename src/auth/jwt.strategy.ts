import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RequestUser } from './types/requestUser';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 「!」付与でnullじゃないことをtypescriptに伝えてる
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  validate(payload: JwtPayload): RequestUser {
    return {
      id: payload.sub,
      name: payload.username,
      status: payload.status,
    };
  }
}
