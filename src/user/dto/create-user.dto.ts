import {
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID_UUID must be a valid UUIDv4' })
  ID_UUID;

  @IsString({ message: 'LOGIN must be a valid string', each: true })
  LOGIN?: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 20,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    { message: 'Password is too weak' },
  )
  SENHA?: string;
}
