import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from './find-user-by-id.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { NotFoundException } from '@nestjs/common';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const id = '1';
    const user = {
      id: id,
      name: 'John Doe',
      email: 'john@example.com',
    };

    it('should return a user if found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(user as any);

      const result = await service.execute(id);

      expect(userRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.execute(id)).rejects.toThrow(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledWith(id);
    });
  });
});
