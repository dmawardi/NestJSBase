import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  // API property adds details to swagger documentation
  @ApiProperty({ description: 'The name of a coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee' })
  @IsString()
  readonly brand: string;

  // Object configuration input tells IsString to expect array of strings
  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
