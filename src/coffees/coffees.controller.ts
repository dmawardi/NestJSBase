import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  // The below is added for the coffees service
  //   private:available in this class only; readonly: best practice, same effect;
  // then, declare instance of class
  constructor(private readonly coffeesService: CoffeesService) {}
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // Set metadata (not best practice)
  // @SetMetadata('isPublic', true)
  // Best practice: make own decorator (below)
  @Public()
  // Return all coffees
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    //   Query parameter below allows you to use pagination: coffees?limit=20&offset=10
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // Log out variable from custom decorator Protocol
    console.log(protocol);
    // For testing timeout exception
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  //   Return details of single coffee using nested URL
  @Get(':id')
  //   The Param decorator below, allows us to to use params in our method below
  //   findOne(@Param() params ) {
  //     return `This action returns #${params.id} coffees`;
  //   }
  // The version below is updated to only use one parameter
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.coffeesService.findOne(id);
  }

  //   Post Decorator for post requests updating whole record routes
  @Post()
  //   Using the Body Decorator, you can access the body of the request
  //   You can pass in a dto here to ensure it conforms to our type structure
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  // Patch decorator for partially updating record routes
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  //   Delete Decorator for deletion request routes
  @Delete(':id')
  //   Methods for this route below
  delete(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
