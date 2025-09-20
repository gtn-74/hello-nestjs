import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

export const CreateApiDoc = () =>
  applyDecorators(
    ApiExtraModels(CreateItemDto), //schema定義
    // @ApiTags('items') 下を書くなら、これ必要なさそう
    ApiOperation({
      summary: 'itemsの作成',
      tags: ['items'],
      deprecated: false,
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'アイテム名',
            example: 'MacBook Pro 14inch',
            maxLength: 40,
          },
          price: {
            type: 'number',
            description: 'アイテムの価格（円）',
            example: 298000,
            minimum: 1,
          },
          description: {
            type: 'string',
            description: 'アイテムの詳細説明',
            example: 'Apple M2 Pro チップ搭載',
            maxLength: 1000,
            nullable: true,
          },
        },
        required: ['name', 'price'],
      },
    }),
    // ApiBody({
    //   description: 'アイテム作成に必要な情報',
    //   type: CreateItemDto, // スキーマ参照できない
    //   examples: {
    //     createItem: {
    //       summary: 'パターンA',
    //       value: {
    //         name: 'MacBook Pro 14inch',
    //         price: 298000,
    //         description: 'Apple M2 Pro チップ搭載の14インチMacBook Pro。',
    //       },
    //     },
    //   },
    // }),
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
