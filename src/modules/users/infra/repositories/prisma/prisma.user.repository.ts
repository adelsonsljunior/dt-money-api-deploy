import { CreateUserDTO, UpdateUserDTO } from "src/modules/users/dto/request";
import { ResponseUserDTO, IdResponseDTO } from "src/modules/users/dto/response";
import { PrismaService } from "src/shared/prisma.service";
import { IUserRepository } from "../user.repository.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO): Promise<IdResponseDTO> {
        const user = await this.prisma.user.create({
            data
        });
        return { id: user.id };
    }

    async findByEmail(email: string): Promise<ResponseUserDTO | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.update_at
        }
    }

    async findById(id: string): Promise<ResponseUserDTO | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.update_at
        }
    }

    async update(data: UpdateUserDTO, id: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}