import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // Return all coffees
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  //   Return details of single coffee
  @Get('/id')
  findOne() {
    return 'This action returns all coffees';
  }
}
