import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // Return all coffees
  @Get()

  //   Using the @Res decorator, you are able to access the response as it's used in Express
  //   This is not the ideal way to use though, so use with caution
  findAll(@Res() response) {
    return response.status(200).send('This action returns all coffees');
  }

  //   Return details of single coffee
  @Get(':id')
  //   The Param decorator below, allows us to to use params in our method below
  //   findOne(@Param() params ) {
  //     return `This action returns #${params.id} coffees`;
  //   }
  // The version below is updated to only use one parameter
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffees`;
  }

  @Post()
  //   Use HttpCode with HttpStatus as below to customize status responses
  @HttpCode(HttpStatus.GONE)
  //   Using the Body Decorator, you can access the body of the request
  create(@Body() body) {
    return body;
  }
}
