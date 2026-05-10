import { FindUserByIdService } from "../services/find-user-by-id.service";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseUserDTO } from "../dto/response/";

@ApiTags('users')
@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: FindUserByIdService) { }

  @Get(':id')
  @ApiResponse({ status: 200, type: ResponseUserDTO, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async execute(@Param('id') id: string) {
    const user = await this.findUserByIdService.execute(id);
    return user;
  }
}