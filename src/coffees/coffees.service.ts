import { NotFoundException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { off } from 'node:process';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import {
  Connection,
  OffsetWithoutLimitNotSupportedError,
  Repository,
} from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoffeesService {
  constructor(
    // inject TypeOrm repository here for access to coffee
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    // To add a non-class based provider
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {
    // code in here will run upon init
    console.log('Initializing............');
    console.log(this.configService);

    // Use configService to grab databaseHost from .env
    // const databaseHost = this.configService.get<string>(
    //   'DATABASE_HOST',
    //   // if value not found, fallback to localhost
    //   // 'localhost',
    // );
    // console.log(databaseHost);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      // List the name of the columns within the coffee entity you want to pull
      relations: ['flavors'],
      // pagination settings
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    // if coffee not found
    if (!coffee) {
      // Throw exception and return status not found
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    // if coffee found
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // Extract flavors from CreateCoffeeDto
    // await on all promises to resolve from mapping through flavors and
    // send to preload to check if existing
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    // Create coffee class instance based on createCoffeeDto
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    // save changes to DB
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    // Creates new entity based on object inserted
    // preload first checks to see if entity exists, and if so retrieves
    // and updates with new details
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
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

  // Recommendation Feature
  //
  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // After starting transaction, wrap in try, catch finally
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      // Send instructions to save coffee and recommendEvent
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      // Await for query runner to commit
      await queryRunner.commitTransaction();
    } catch (err) {
      // rollback all changes
      await queryRunner.rollbackTransaction();
    } finally {
      // Release the connection
      await queryRunner.release();
    }
  }

  //
  // Private Methods
  // Depending on name, add or return if existing
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    // Check if flavor exists in database
    const existingFlavor = await this.flavorRepository.findOne({ name });
    // if so,
    if (existingFlavor) {
      // return flavor
      return existingFlavor;
    }
    // if not, create an instance of flavor name
    return this.flavorRepository.create({ name });
  }
}
