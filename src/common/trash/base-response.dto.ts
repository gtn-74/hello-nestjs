// // データベースから取得したデータの基本的な型
// export interface DatabaseEntity {
//   //   id: string;
//   createAt: Date;
//   updateAt: Date;
// }

// export abstract class BaseResponseDto {
//   static transform<T>(this: new (data: T) => T, data: T): T {
//     return new this(data);
//   }

//   static transformArray<T>(this: new (data: T) => T, dataArray: T[]): T {
//     dataArray.map((data) => {
//       const { createdAt, updatedAt, ...resData } = data;
//       return resData;
//     });
//   }
// }
