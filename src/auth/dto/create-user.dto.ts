import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { UserStatus } from 'generated/prisma';

// 再起動したらこれじゃなくてもいけた
// import { UserStatus } from 'generated/prisma';
// export enum UserStatus {
//   FREE = 'FREE',
//   PREMIUM = 'PREMIUM',
// }

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;
  @IsEmail()
  email: string;

  // パスワードバリデーション
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
