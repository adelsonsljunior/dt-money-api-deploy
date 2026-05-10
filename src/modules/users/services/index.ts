import { CreateUserService } from "./create-user.service";
import { FindUserByIdService } from "./find-user-by-id.service";

export const userServices = [
    CreateUserService,
    FindUserByIdService
]