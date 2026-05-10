import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from './delete-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const userId = '1';

    it('should delete a user successfully', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
      } as any);
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await service.execute(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.execute(userId)).rejects.toThrow(NotFoundException);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });
});
