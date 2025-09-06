import * as prisma from 'generated/prisma';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<prisma.User> {
    return await this.authService.createUser(createUserDto);
  }
}
