import bcrypt from 'bcrypt';

import { CreateUserDTO } from "../dto/request/create-user.dto";
import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: CreateUserDTO) {

    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    return this.userRepository.create(data);
  }
}