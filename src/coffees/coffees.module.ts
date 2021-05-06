import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';

// You can create a new class and use it in providers below with useValue
// class MockCoffeesService {}

// Factory Provider class
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nesCafe'];
  }
}

// Module decorator accepts single object that contains context of module in relation to other
@Module({
  // API routes that we want this model to instantiate
  controllers: [CoffeesController],
  // Providers within this module that need to be available anywhere this module is imported
  exports: [CoffeesService],
  // Providors external that this module needs for use
  // Use TypeOrm here with .forFeature (as it's in submodule) and pass in array of entities
  imports: [
    // Import Config module to access .env variables
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule,
  ],
  // Services that need to be instantiated by Nest Injector
  // Only available within this module itself
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      // useValue option
      // useValue: ['nescafe', 'Buddy_Brews'],
      // useFactory option
      useFactory: () => ['nescafe', 'Buddy_Brews'],
    },
  ],
})
export class CoffeesModule {}
