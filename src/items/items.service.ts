import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  findAll() {
    return 'This is itemsService';
  }
}
// このサービスメソッドをコントローラから利用するためにDIする必要がある。
