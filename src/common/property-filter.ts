// export class PropertyFilter {
//   constructor() {
//     this.excludedPropoerties = new Set();
//   }

//   exclude(properties) {
//     if (Array.isArray(properties)) {
//       properties.forEach((prop) => this.excludedPropoerties.add(prop));
//     } else {
//       this.excludedPropoerties.add(properties);
//     }
//     return this;
//   }

//   cleanExclusions() {
//     this.excludedPropoerties.clear();
//     return this;
//   }

//   filter(array) {
//     if (!Array.isArray(array)) {
//       throw new Error('引数が配列じゃない');
//     }

//     return array.map((obj) => {
//       if (typeof obj !== 'object' || obj === null) {
//         return obj;
//       }

//       const filtered = {};
//       for (const [key, value] of Object.entries(obj)) {
//         if (!this.excludedPropoerties.has(key)) {
//           filtered[key] = value;
//         }
//       }
//       return filtered;
//     });
//   }

//   static filterExcluding(array, properties) {
//     const filter = new PropertyFilter();
//     return filter.exclude(properties).filter(array);
//   }

//   /**
//    * 現在の除外設定を取得
//    * @returns {string[]} 除外プロパティのリスト
//    */
//   getExcludedProperties() {
//     return Array.from(this.excludedProperties);
//   }
// }

// export class PropertyFilter {
//   private excludedProperties: Set<string>;

//   constructor() {
//     this.excludedProperties = new Set<string>();
//   }

//   /**
//    * 除外するプロパティを設定
//    */
//   exclude(properties: string | string[]): PropertyFilter {
//     if (Array.isArray(properties)) {
//       properties.forEach((prop) => this.excludedProperties.add(prop));
//     } else {
//       this.excludedProperties.add(properties);
//     }
//     return this;
//   }

//   /**
//    * 除外設定をクリア
//    */
//   clearExclusions(): PropertyFilter {
//     this.excludedProperties.clear();
//     return this;
//   }

//   /**
//    * 配列の各オブジェクトから指定されたプロパティを除外
//    */
//   filter<T extends Record<string, T>>(array: T[]): Partial<T>[] {
//     if (!Array.isArray(array)) {
//       throw new Error('引数は配列である必要があります');
//     }

//     return array.map((obj) => {
//       if (typeof obj !== 'object' || obj === null) {
//         return obj as Partial<T>;
//       }

//       // Object.fromEntriesを使用してより型安全に処理
//       const filteredEntries = Object.entries(obj).filter(
//         ([key]) => !this.excludedProperties.has(key),
//       );

//       return Object.fromEntries(filteredEntries) as Partial<T>;
//     });
//   }

//   /**
//    * 除外するプロパティを一時的に指定してフィルタリング
//    */
//   static filterExcluding<T extends Record<string, any>>(
//     array: T[],
//     properties: string | string[],
//   ): Partial<T>[] {
//     const filter = new PropertyFilter();
//     return filter.exclude(properties).filter(array);
//   }

//   /**
//    * 現在の除外設定を取得
//    */
//   getExcludedProperties(): string[] {
//     return Array.from(this.excludedProperties);
//   }
// }

// // 使用例:

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   age: number;
// }

// const data: UserData[] = [
//   {
//     id: 1,
//     name: '田中',
//     email: 'tanaka@example.com',
//     password: 'secret123',
//     age: 30,
//   },
// ];

// // 方法1: インスタンスを作成して使用
// const filter = new PropertyFilter();
// filter.exclude(['password', 'email']);
// const result1 = filter.filter(data);

// // 方法2: メソッドチェーンを使用
// const result2 = new PropertyFilter()
//   .exclude('password')
//   .exclude('email')
//   .filter(data);

// // 方法3: 静的メソッドを使用（一回限りの処理）
// const result3 = PropertyFilter.filterExcluding(data, ['password', 'email']);
