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

@Controller('coffees')
export class CoffeesController {
  // Return all coffees
  @Get()
  //   Query parameter below allows you to use pagination: coffees?limit=20&offset=10
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}. Offset: ${offset}`;
  }

  //   Return details of single coffee using nested URL
  @Get(':id')
  //   The Param decorator below, allows us to to use params in our method below
  //   findOne(@Param() params ) {
  //     return `This action returns #${params.id} coffees`;
  //   }
  // The version below is updated to only use one parameter
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffees`;
  }

  //   Post Decorator for post requests updating whole record routes
  @Post()
  //   Using the Body Decorator, you can access the body of the request
  create(@Body() body) {
    return body;
  }

  // Patch decorator for partially updating record routes
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  //   Delete Decorator for deletion request routes
  @Delete(':id')
  //   Methods for this route below
  delete(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
