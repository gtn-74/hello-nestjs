import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from 'generated/prisma';
// import { ItemListResponseDto } from 'src/common/item-list-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  // !クライアントで必要ないものを除去したい
  async findAll(): Promise<Item[]> {
    const dbData = await this.prismaService.item.findMany();
    // return ItemListResponseDto.transformArray(dbData);
    return dbData;
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // ?RDB操作は非同期処理のため、async,awaitを追加
  async create(createItemDto: CreateItemDto, userId: string): Promise<Item> {
    // !RDB接続にあたってロジックを変更
    const { name, price, description } = createItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
        userId,
      },
    });
  }

  async updateStatus(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: ItemStatus.SOLD_OUT,
      },
      where: {
        id,
      },
    });
  }

  // 同時に処理しないとAPIテストできない?
  async updatePrice(id: string, createItemDto: CreateItemDto): Promise<Item> {
    return await this.prismaService.item.update({
      data: { price: createItemDto.price },
      where: { id },
    });
  }

  async delete(id: string, userId: string) {
    await this.prismaService.item.delete({
      // !下の引数が一致したものだけ削除できる
      where: {
        id,
        userId,
      },
    });
  }
}
