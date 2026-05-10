import { Module } from "@nestjs/common";
import { userControllers } from "./controllers";
import { userServices } from "./services";
import { PrismaService } from "src/shared/prisma.service";
import { IUserRepository } from "./infra/repositories/user.repository.abstract";
import { PrismaUserRepository } from "./infra/repositories/prisma/prisma.user.repository";

@Module({
  controllers: [...userControllers],
  providers: [PrismaService, {
    provide: IUserRepository,
    useClass: PrismaUserRepository
  }, ...userServices],
  exports: [],
})
export class UserModule { }