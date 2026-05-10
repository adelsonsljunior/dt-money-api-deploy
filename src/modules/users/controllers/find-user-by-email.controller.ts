import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindUserByEmailService } from "../services/find-user-by-email.service";
import { ResponseUserDTO } from "../dto/response";

@ApiTags('users')
@Controller('users')
export class FindUserByEmailController {
  constructor(private readonly findUserByEmailService: FindUserByEmailService) { }

  @Get('/email/:email')
  @ApiResponse({ status: 200, type: ResponseUserDTO, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findByEmail(@Param('email') email: string) {
    const user = await this.findUserByEmailService.execute(email);
    return user;
  }
}