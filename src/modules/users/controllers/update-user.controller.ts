import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserService } from "../services/update-user.service";
import { UpdateUserDTO } from "../dto/request";

@ApiTags('users')
@Controller('users')
export class UpdateUserController {

  constructor(private readonly updateUserService: UpdateUserService) {
  }

  @Patch('/:id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO){
    this.updateUserService.execute(data, id)
  }
}