import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  // inject TypeOrm here for access to coffee
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne(id);
    // if coffee not found
    if (!coffee) {
      // Throw exception and return status not found
      throw new NotFoundException(`Coffee #${id} is not found`);
    }
    // if coffee found
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // Create coffee class instance based on createCoffeeDto
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    // save changes to DB
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // Creates new entity based on object inserted
    // preload first checks to see if entity exists, and if so retrieves
    // and updates with new details
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    // if id not found, will return undefined
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      //   Create class of updateCoffeeDto and store
    }
    // Finalize changes
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    // Check if coffee found in database. throws exceptions if encountered automatically
    const coffee = await this.coffeeRepository.findOne(id);
    // Remove from database
    return this.coffeeRepository.remove(coffee);
  }
}
