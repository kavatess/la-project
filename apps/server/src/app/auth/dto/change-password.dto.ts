import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  newPassword: string;
}
