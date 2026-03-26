import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export const SignInApiDoc = () =>
  applyDecorators(
    ApiExtraModels(CreateUserDto), //schema定義
    ApiOperation({
      summary: 'ログイン',
      tags: ['auth'],
      deprecated: false,
    }),
    ApiBody({
      description: 'ログイン認証情報',
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'ユーザーのメールアドレス',
            example: 'example@test.com',
          },
          password: {
            type: 'string',
            description:
              'パスワード（8文字以上、大文字・小文字・数字・記号を各1つ以上含む）',
            example: 'Gtn-804918360',
            minLength: 8,
            // OpenAPI 3.0ではバリデーション詳細を以下のように記述
            // 'x-validation': {
            //   minLength: 8,
            //   minUppercase: 1,
            //   minLowercase: 1,
            //   minNumbers: 1,
            //   minSymbols: 1,
            // },
          },
        },
        required: ['email', 'password'],
      },
      examples: {
        validExample: {
          summary: '有効な認証情報',
          value: {
            email: 'user@example.com',
            password: 'StrongPass123!',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: '正常系',
      // content: {
      //   'application/json': {
      //     example: [
      //       {
      //         id: '0000000000000',
      //         name: 'testProduct1',
      //         price: 11111,
      //         description: 'テストディスクリプション',
      //         status: 'ON_SALE',
      //         // createAt: '2025-09-07T01:25:03.000Z',
      //         // updateAt: '2025-09-07T01:25:03.000Z',
      //         userId: '0000000000000',
      //       },
      //       {
      //         id: '0000000000000',
      //         name: 'testProduct1',
      //         price: 11111,
      //         description: 'テストディスクリプション',
      //         status: 'SOLD_OUT',
      //         // createAt: '2025-09-07T01:25:03.000Z',
      //         // updateAt: '2025-09-07T01:25:03.000Z',
      //         userId: '0000000000000',
      //       },
      //     ],
      //   },
      // },
    }),
    // ApiResponse({
    //   status: HttpStatus.NOT_FOUND,
    //   description: '該当するユーザが存在しないとき',
    //   content: {
    //     'application/json': {
    //       example: [
    //         {
    //           message: '該当するIDを持つユーザが存在しません',
    //           error: 'Not Found',
    //           statusCode: 404,
    //         },
    //       ],
    //     },
    //   },
    // }),
  );
