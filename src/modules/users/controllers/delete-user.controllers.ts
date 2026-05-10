import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteUserService } from "../services/delete-user.service";

@ApiTags('users')
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) { }

  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Usuário apagado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async deleteUser(@Param('id') id: string) {
    await this.deleteUserService.execute(id);
  }

}