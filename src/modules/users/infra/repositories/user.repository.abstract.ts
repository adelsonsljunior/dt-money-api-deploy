import { CreateUserDTO, UpdateUserDTO } from "../../dto/request";
import { IdResponseDTO } from "../../dto/response/id-response.dto";
import { ResponseUserDTO } from "../../dto/response/response-user.dto";
''

export abstract class IUserRepository {
    abstract create(data: CreateUserDTO): Promise<IdResponseDTO>;
    abstract findByEmail(email: string): Promise<ResponseUserDTO | null>;
    abstract findById(id: string): Promise<ResponseUserDTO | null>;
    abstract update(data: UpdateUserDTO, id: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
}