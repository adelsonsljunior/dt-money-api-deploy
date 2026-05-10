import { CreateUserService } from "./create-user.service";
import { FindUserByEmailService } from "./find-user-by-email.service";
import { FindUserByIdService } from "./find-user-by-id.service";

export const userServices = [
    CreateUserService,
    FindUserByIdService,
    FindUserByEmailService
]