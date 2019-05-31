import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { UniqueEntity } from '../unique-entity-constraint';
import { User } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name!: string;

  @IsEmail()
  @IsOptional()
  @UniqueEntity(User)
  readonly email!: string;
}
