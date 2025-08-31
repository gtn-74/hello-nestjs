import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import * as itemsModel from './items.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  // findAllは、こちら側で定義した名前。つまり、findAllじゃなくても良い
  findAll(): itemsModel.Item[] {
    // return 'This is findAll';
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): itemsModel.Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
    // 最初は出品中であるためパラメータに入れておく必要がない
    // @Body('status') status: number,
  ): itemsModel.Item {
    const item: itemsModel.Item = {
      id,
      name,
      price,
      description,
      status: 'ON_SALE',
    };
    return this.itemsService.create(item);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string) {
    return this.itemsService.updateStatus(id);
  }

  @Put(':id/price')
  updatePrice(
    @Param('id') id: string,
    @Body('price') price: number,
  ): itemsModel.Item {
    return this.itemsService.updatePrice(id, price);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
