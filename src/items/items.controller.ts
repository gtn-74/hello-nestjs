import { Controller, Get } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  // findAllは、こちら側で定義した名前。つまり、findAllじゃなくても良い
  findAll() {
    return 'This is findAll';
  }
}
