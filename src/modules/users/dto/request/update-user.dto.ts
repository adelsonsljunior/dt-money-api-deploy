import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from ".";

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }