export class UpdateCoffeeDto {
  // The addition of a question mark makes the input optional
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
