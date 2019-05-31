import { IsString, IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { UniqueEntity } from '../unique-entity-constraint';
import { User } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  @UniqueEntity(User)
  readonly email!: string;
}
