import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  // Object configuration input tells IsString to expect array of strings
  @IsString({ each: true })
  readonly flavors: string[];
}
