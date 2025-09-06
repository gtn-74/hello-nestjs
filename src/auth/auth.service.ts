import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';
import bcrypt from 'node_modules/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class AuthService {
  // private は、このクラスのみでアクセスできる的な意味らしい
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, status } = createUserDto;

    // passwordのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // statusどうするの??
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status,
      },
    });
  }

  // リクエストで渡されたcredential.dtoのemailとpasswordの検証
  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentialsDto;
    // 引数をキーに、dbからユーザーを探すから下ちゃう
    // const user = await this.jwtService.sign({});
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    // 引数のパスワードと、dbのパスワードを比較してる
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.name,
        status: user.status,
      };
      // .signメソッドは、jwtServiceで用意されているメソッドっぽい
      const token = this.jwtService.sign(payload);
      return { token };
      // !したみたいな書き方もできる様子
      // const token = this.jwtService.sign(payload, {
      //   expiresIn: '1h',
      //   secret: 'custom-secret', // デフォルトと異なるsecretを使用
      // });
    }
    // 例外401
    throw new UnauthorizedException();
  }
}
