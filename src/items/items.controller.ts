import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  // findAllは、こちら側で定義した名前。つまり、findAllじゃなくても良い
  findAll() {
    // return 'This is findAll';
    return this.itemsService.findAll();
  }
}
