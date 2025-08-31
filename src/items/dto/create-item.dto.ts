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
