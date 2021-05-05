import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

// You can create a new class and use it in providers below with useValue
// class MockCoffeesService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// Module decorator accepts single object that contains context of module in relation to other
@Module({
  // API routes that we want this model to instantiate
  controllers: [CoffeesController],
  // Providers within this module that need to be available anywhere this module is imported
  exports: [CoffeesService],
  // Providors external that this module needs for use
  // Use TypeOrm here with .forFeature (as it's in submodule) and pass in array of entities
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  // Services that need to be instantiated by Nest Injector
  // Only available within this module itself
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['nescafe', 'Buddy_Brews'],
    },
    {
      // Example config service that would alter configuration based on environment
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
export class CoffeesModule {}
