import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateItemDto {
  // uuidに置換
  //   id: string;

  @ApiProperty({
    description: 'アイテム名',
    example: 'MacBook Pro 14inch',
    type: 'string', // !重要：型を明示。小文字のstringは、あたい
    maxLength: 40,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
