import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDTO {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id: string;
  @ApiProperty({ example: 'Marceline' })
  name: string;
  @ApiProperty({ example: 'marcievq@ooo.com' })
  email: string;
  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  created_at: Date;
  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updated_at: Date;
}