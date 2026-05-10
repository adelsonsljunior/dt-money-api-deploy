import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { NotFoundException, ConflictException } from '@nestjs/common';
import bcrypt from 'bcrypt';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let userRepository: IUserRepository;

  const mockUserRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    userRepository = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const userId = '1';
    const updateData = {
      name: 'John Updated',
      email: 'new@example.com',
      password: 'newpassword123',
    };
    const existingUser = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
    };

    it('should update a user successfully', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser as any);
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword') as any);
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);

      await service.execute(updateData, userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(updateData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(userRepository.update).toHaveBeenCalledWith(
        {
          ...updateData,
          password: 'hashedPassword',
        },
        userId,
      );
    });

    it('should throw NotFoundException if user to update does not exist', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.execute(updateData, userId)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if new email already exists for another user', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser as any);
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: '2',
        email: 'new@example.com',
      } as any);

      await expect(service.execute(updateData, userId)).rejects.toThrow(ConflictException);
    });

    it('should allow updating if email belongs to the same user', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser as any);
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(existingUser as any);
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);

      await service.execute({ email: 'john@example.com' }, userId);

      expect(userRepository.update).toHaveBeenCalled();
    });

    it('should not hash password if not provided', async () => {
      const dataWithoutPassword = { name: 'New Name' };
      jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser as any);
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await service.execute(dataWithoutPassword, userId);

      expect(hashSpy).not.toHaveBeenCalled();
      expect(userRepository.update).toHaveBeenCalledWith(dataWithoutPassword, userId);
    });
  });
});
