import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { ConflictException } from '@nestjs/common';
import bcrypt from 'bcrypt';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    it('should create a new user successfully', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockResolvedValue({ id: '1' });
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword') as any);

      const result = await service.execute(createUserDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashedPassword',
      });
      expect(result).toEqual({ id: '1' });
    });

    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      } as any);

      await expect(service.execute(createUserDto)).rejects.toThrow(ConflictException);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });
});
