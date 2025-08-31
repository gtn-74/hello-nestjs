import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
// prismaクライアントから生成された型に変換
// import { Item } from './items.model';
import { Item, ItemStatus } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  // TODO:コンストラクタってなんやねん
  constructor(private prismaService: PrismaService) {}
  // ローカルで確認するためのもの
  // private items: Item[] = [];
  async findAll(): Promise<Item[]> {
    // findManyは複数条件を指定できるメソッド
    return await this.prismaService.item.findMany();
    // return 'This is itemsService';
  }
  // このサービスメソッドをコントローラから利用するためにDIする必要がある。

  async findById(id: string): Promise<Item> {
    // 例外
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    // const found = this.prismaService.item.find((item) => item.id === id);
    if (!found) {
      // ステータスコード404と、404に応じたメッセージを返却してくれる
      throw new NotFoundException();
    }
    return found;
    // return this.items.find((item) => item.id === id);
    // const items = this.items.find((item) => item.id === id);
    // if (!items) {
    //   throw new Error('商品がありません。');
    // }
    // return items;
  }

  // ?RDB操作は非同期処理のため、async,awaitを追加
  async create(createItemDto: CreateItemDto): Promise<Item> {
    // !RDB接続にあたってロジックを変更
    const { name, price, description } = createItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
      },
    });
    // const item: Item = {
    //   ...CreateItemDto,
    //   id: uuid(),
    //   status: 'ON_SALE',
    // };
    // this.items.push(item);
    // return item;
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
    // const item = this.findById(id);
    // item.status = 'SOLD_OUT';
    // return item;
    // 受け取ったidと一致したオブジェクトを上書きする方法を考えてた
    // const items = this.items.find((item) => item.id === id);
    // items.map((item))
  }

  // 同時に処理しないとAPIテストできない?
  async updatePrice(id: string, createItemDto: CreateItemDto): Promise<Item> {
    return await this.prismaService.item.update({
      data: { price: createItemDto.price },
      where: { id },
    });
    // const item = this.findById(id);
    // item.price = createItemDto.price;
    // return item;
  }

  // 特段返値は無いで良い？
  async delete(id: string) {
    await this.prismaService.item.delete({
      where: {
        id,
      },
    });
    // this.items = this.items.filter((item) => item.id !== id);
    // const item = this.findById(id);
  }
}
