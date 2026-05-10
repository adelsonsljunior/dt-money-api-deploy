import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserService } from "../services/update-user.service";
import { UpdateUserDTO } from "../dto/request";

@ApiTags('users')
@Controller('users')
export class UpdateUserController {

  constructor(private readonly updateUserService: UpdateUserService) {
  }

  @Patch('/:id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 409, description: 'E-mail já existe' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    this.updateUserService.execute(data, id)
  }
}