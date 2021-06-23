import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffees = /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  // build expected result
  const expectedPartialCoffee = jasmine.objectContaining({
    // jasmine is another testing framework that jest is based on
    // has lots of helper and utility functions for tests
    // objectContaining is for partial matching
    ...coffee,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map((name) => jasmine.objectContaining({ name })),
    ),
  });

  let app: INestApplication;
  let httpServer: HttpServer;

  // Changed beforeEach to beforeAll for one startup before testing
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          database: 'postgres',
          password: 'pass123',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    // This is only used in e2e test to instantiate app
    // due to this, all things added to app, must be added here
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        // Makes sure all unwanted properties are automatically stripped out
        // This is possible through nest's dto system effortlessly
        whitelist: true,
        // If any non whitelisted data is detected, automatically forbid from proceeding
        forbidNonWhitelisted: true,
        // Automatically perform type conversion. eg) numbers and booleans
        transform: true,
        transformOptions: {
          // Types are assumed and don't need to be explicitly state
          // Auto converted
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/coffees')
      .then(({ body }) => {
        console.log(body);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialCoffee);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      name: 'New and Improved Shipwreck Roast',
    };
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body.name).toEqual(updateCoffeeDto.name);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  // it.todo('Get all [GET /]');
  // it.todo('Get one [GET /:id]');
  // it.todo('Update one [PATCH /:id]');
  // it.todo('Delete one [DELETE /:id]');

  // after all tests, close
  afterAll(async () => {
    // let's Jest know to close all connections in our application
    await app.close();
  });
});
