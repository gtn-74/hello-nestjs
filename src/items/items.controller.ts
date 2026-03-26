import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
// import * as itemsModel from './items.model';
import { CreateItemDto } from './dto/create-item.dto';
import * as prisma from 'generated/prisma';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { RequestUser } from 'src/auth/types/requestUser';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindItemAllDetailApiDoc } from 'src/docs/decorators/items/findItem-all-detail-api-doc';
import { CreateApiDoc } from 'src/docs/decorators/items/create-api-docs';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  // ? 付与しなくてもオートでパスがセットされている様子
  @ApiTags('items') //! 自分で付与するタイプ
  @FindItemAllDetailApiDoc()
  // findAllは、こちら側で定義した名前。つまり、findAllじゃなくても良い
  async findAll(): Promise<prisma.Item[]> {
    // return 'This is findAll';
    return await this.itemsService.findAll();
  }

  @Get(':id')
  @ApiTags('items') //! 自分で付与するタイプ
  // ParseUUIDPipeは、バリデーションパイプ
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<prisma.Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @CreateApiDoc()
  @ApiBearerAuth('jwt')
  // !jwt認証
  // リクエストにjwtがない場合、401で返される
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: express.Request & { user: RequestUser },
    // MEMO:Bodyパラメータでひとつずつ受け取るのはめんどくさい。
    // DTOで一つにまとめることができる
    // @Body('id') id: string,
    // @Body('name') name: string,
    // @Body('price') price: number,
    // @Body('description') description: string,
    // 最初は出品中であるためパラメータに入れておく必要がない
    // @Body('status') status: number,
  ): Promise<prisma.Item> {
    // const item: Item = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   status: 'ON_SALE',
    // };
    // return this.itemsService.create(item);
    return this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<prisma.Item> {
    return await this.itemsService.updateStatus(id);
  }

  // @Put(':id/price')
  // updatePrice(
  //   @Param('id') id: string,
  //   @Body('price') price: number,
  // ): Item {
  //   return this.itemsService.updatePrice(id, price);
  // }
  // !あえてガード張らない
  @Put('update/:id')
  async updatePrice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createItemDto: CreateItemDto,
  ): Promise<prisma.Item> {
    return await this.itemsService.updatePrice(id, createItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: express.Request & { user: RequestUser },
  ) {
    return await this.itemsService.delete(id, req.user.id);
  }
}
