import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Max, MinLength } from "class-validator";

export class UpdateUserDTO {
  @ApiProperty({ example: 'Marceline' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'marcievq@ooo.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password: string;
}