import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { UpdateUserDTO } from "../dto/request";

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: UpdateUserDTO, id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.email && user.email !== data.email) {
      const userByEmail = await this.userRepository.findByEmail(data.email)
      if (userByEmail) throw new ConflictException('Email already exists');
    }

    await this.userRepository.update(data, id);
  }

}