import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailService } from './find-user-by-email.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { NotFoundException } from '@nestjs/common';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const email = 'john@example.com';
    const user = {
      id: '1',
      name: 'John Doe',
      email: email,
    };

    it('should return a user if found', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user as any);

      const result = await service.execute(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      await expect(service.execute(email)).rejects.toThrow(NotFoundException);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});
