import { CreateUserController } from "./create-user.controller";
import { FindUserByEmailController } from "./find-user-by-email.controller";
import { FindUserByIdController } from "./find-user-by-id.controller";

export const userControllers = [
  CreateUserController,
  FindUserByIdController,
  FindUserByEmailController
]