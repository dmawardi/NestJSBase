import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  // The below is added for the coffees service
  //   private:available in this class only; readonly: best practice, same effect;
  // then, declare instance of class
  constructor(private readonly coffeesService: CoffeesService) {}

  // Return all coffees
  @Get()
  //   Query parameter below allows you to use pagination: coffees?limit=20&offset=10
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  //   Return details of single coffee using nested URL
  @Get(':id')
  //   The Param decorator below, allows us to to use params in our method below
  //   findOne(@Param() params ) {
  //     return `This action returns #${params.id} coffees`;
  //   }
  // The version below is updated to only use one parameter
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  //   Post Decorator for post requests updating whole record routes
  @Post()
  //   Using the Body Decorator, you can access the body of the request
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  // Patch decorator for partially updating record routes
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  //   Delete Decorator for deletion request routes
  @Delete(':id')
  //   Methods for this route below
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
