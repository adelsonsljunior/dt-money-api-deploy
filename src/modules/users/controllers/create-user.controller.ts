import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDTO } from "../dto/request/create-user.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserService } from "../services/create-user.service";
import { IdResponseDTO } from "../dto/response/id-response.dto";

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService
  ) { }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, type: IdResponseDTO, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Usuário já existe' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createUser(@Body() data: CreateUserDTO) {
    return await this.createUserService.execute(data);
  }
}