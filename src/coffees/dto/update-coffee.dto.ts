// PartialType allows us to return the class of the object passed to to it
import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

// PartialType replicates the CreateCoffeeDto but with optional inputs
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  // The addition of a question mark makes the input optional
  //   readonly name?: string;
  //   readonly brand?: string;
  //   readonly flavors?: Flavor[];
}
