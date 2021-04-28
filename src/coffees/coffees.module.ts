import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// Module decorator accepts single object that contains context of module in relation to other
@Module({
  // API routes that we want this model to instantiate
  controllers: [CoffeesController],
  // Providers within this module that need to be available anywhere this module is imported
  // exports:,
  // Providors external that this module needs for use
  // imports:,
  // Services that need to be instantiated by Nest Injector
  // Only available within this module itself
  providers: [CoffeesService],
})
export class CoffeesModule {}
