import bcrypt from 'bcrypt';

import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { UpdateUserDTO } from "../dto/request";

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: UpdateUserDTO, id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.email) {
      const userByEmail = await this.userRepository.findByEmail(data.email)
      if (userByEmail && userByEmail.id !== id) throw new ConflictException('Email already exists');
    }

    if (data.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
    }

    await this.userRepository.update(data, id);
  }

}