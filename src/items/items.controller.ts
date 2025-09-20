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
import { CreateItemDto } from './dto/create-item.dto';
import * as prisma from 'generated/prisma';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { RequestUser } from 'src/auth/types/requestUser';
// import { ItemListResponseDto } from 'src/common/item-list-response.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<prisma.Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<prisma.Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: express.Request & { user: RequestUser },
  ): Promise<prisma.Item> {
    return this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<prisma.Item> {
    return await this.itemsService.updateStatus(id);
  }

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
