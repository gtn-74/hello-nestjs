import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import * as itemsModel from './items.model';
import { CreateItemDto } from './dto/create-item.dto';

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
  // ParseUUIDPipeは、バリデーションパイプ
  findById(@Param('id', ParseUUIDPipe) id: string): itemsModel.Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    // MEMO:Bodyパラメータでひとつずつ受け取るのはめんどくさい。
    // DTOで一つにまとめることができる
    // @Body('id') id: string,
    // @Body('name') name: string,
    // @Body('price') price: number,
    // @Body('description') description: string,
    @Body() createItemDto: CreateItemDto,
    // 最初は出品中であるためパラメータに入れておく必要がない
    // @Body('status') status: number,
  ): itemsModel.Item {
    // const item: itemsModel.Item = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   status: 'ON_SALE',
    // };
    // return this.itemsService.create(item);
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.updateStatus(id);
  }

  // @Put(':id/price')
  // updatePrice(
  //   @Param('id') id: string,
  //   @Body('price') price: number,
  // ): itemsModel.Item {
  //   return this.itemsService.updatePrice(id, price);
  // }
  @Put('update/:id')
  updatePrice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createItemDto: CreateItemDto,
  ): itemsModel.Item {
    return this.itemsService.updatePrice(id, createItemDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.delete(id);
  }
}
