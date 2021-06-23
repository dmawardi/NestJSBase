import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// Mock repository
// New mock repository type which represents an object that consists
// of some of the properties of the Repository type (<key of Repository<T>)
// All of these are of type jest.Mock, a mock function provided by Jest
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// generic function that returns above created class (when type argument provided)
// else, creates class of type any
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  // init provider from below for use in test
  let coffeeRepository: MockRepository;

  // To be executed before every test (setup phase)
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: Connection,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    // .get is for retrieving static instance declared within module
    // To retrieve request scope or transient scoped providers,
    // use resolve instead of get
    service = module.get<CoffeesService>(CoffeesService);
    // service = await module.resolve(CoffeesService)

    // Setting up repositories before each test
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  // represents a single test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    // Success path
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};

        // stage mock successful return
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);

        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    // Fail path
    describe('otherwise', () => {
      it('should throw the "NotFoundException', async () => {
        const id = 1;
        // stage mock undefined return for when function run below
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${id} not found`);
        }
      });
    });
  });
});
