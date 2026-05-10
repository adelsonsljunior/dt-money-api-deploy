import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";

@Injectable()
export class FindUserByIdService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}