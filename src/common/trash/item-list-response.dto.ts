// import { ItemStatus } from 'generated/prisma';
// import { BaseResponseDto } from './base-response.dto';

// // Itemが既にDatabaseEntityの要件を満たしているかを確認
// export interface ItemEntity {
//   id: string;
//   name: string;
//   price: number;
//   description: string | null;
//   status: ItemStatus;
// }

// export class ItemListResponseDto extends BaseResponseDto {
//   id: string;
//   name: string;
//   price: number;
//   description: string | null;
//   status: ItemStatus;

//   constructor(item: ItemEntity) {
//     super();
//     this.id = item.id;
//     this.name = item.name;
//     this.price = item.price;
//     this.description = item.description;
//     this.status = item.status;
//   }
// }
