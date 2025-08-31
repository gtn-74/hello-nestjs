import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll(): Item[] {
    // return 'This is itemsService';
    return this.items;
  }
  // このサービスメソッドをコントローラから利用するためにDIする必要がある。

  findById(id: string): Item {
    // return this.items.find((item) => item.id === id);
    const items = this.items.find((item) => item.id === id);
    if (!items) {
      throw new Error('商品がありません。');
    }
    return items;
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    // 受け取ったidと一致したオブジェクトを上書きする方法を考えてた
    // const items = this.items.find((item) => item.id === id);
    // items.map((item))

    const item = this.findById(id);
    item.status = 'SOLD_OUT';
    return item;
  }

  updatePrice(id: string, price: number): Item {
    const item = this.findById(id);
    item.price = price;
    return item;
  }

  // 特段返値は無いで良い？
  delete(id: string) {
    // const item = this.findById(id);
    this.items = this.items.filter((item) => item.id !== id);
  }
}
