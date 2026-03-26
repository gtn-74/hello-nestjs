import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const FindItemBylDetailApiDoc = () =>
  applyDecorators(
    // @ApiTags('items') 下を書くなら、これ必要なさそう
    ApiOperation({
      summary: 'itemsの一覧の取得',
      tags: ['items'],
      deprecated: false,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '正常系',
      content: {
        fetch: {
          example: [
            {
              id: '0000000000000',
              name: 'testProduct1',
              price: 11111,
              description: 'テストディスクリプション',
              status: 'ON_SALE',
              // createAt: '2025-09-07T01:25:03.000Z',
              // updateAt: '2025-09-07T01:25:03.000Z',
              userId: '0000000000000',
            },
            {
              id: '0000000000000',
              name: 'testProduct1',
              price: 11111,
              description: 'テストディスクリプション',
              status: 'SOLD_OUT',
              // createAt: '2025-09-07T01:25:03.000Z',
              // updateAt: '2025-09-07T01:25:03.000Z',
              userId: '0000000000000',
            },
          ],
        },
      },
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
