import { CreateUserController } from "./create-user.controller";
import { DeleteUserController } from "./delete-user.controllers";
import { FindUserByEmailController } from "./find-user-by-email.controller";
import { FindUserByIdController } from "./find-user-by-id.controller";
import { UpdateUserController } from "./update-user.controller";

export const userControllers = [
  CreateUserController,
  FindUserByIdController,
  FindUserByEmailController,
  UpdateUserController,
  DeleteUserController
]