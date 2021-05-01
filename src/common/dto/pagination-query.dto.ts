import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

// Use the common folder for entities related to multiple controllers
export class PaginationQueryDto {
  @IsOptional()
  //   Is above 0
  @IsPositive()
  // First parameter for Type decorator is function returning type
  //   This also automatically casts the input as a number
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
