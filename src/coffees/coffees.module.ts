import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';

// Module decorator accepts single object that contains context of module in relation to other
@Module({
  // API routes that we want this model to instantiate
  controllers: [CoffeesController],
  // Providers within this module that need to be available anywhere this module is imported
  // exports:,
  // Providors external that this module needs for use
  // Use TypeOrm here with .forFeature (as it's in submodule) and pass in array of entities
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  // Services that need to be instantiated by Nest Injector
  // Only available within this module itself
  providers: [CoffeesService],
})
export class CoffeesModule {}
