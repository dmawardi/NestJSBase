import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    // import TypeOrm with config
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // the default for postgres sql
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      // loads modules automatically instead of having to provide entities array
      autoLoadEntities: true,
      // Ensures our TypeOrm entities will be synced with database
      // Great for development. Disable for production
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
