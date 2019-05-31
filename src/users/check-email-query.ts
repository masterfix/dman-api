import { Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';

@Injectable()
export class CheckEmailQuery {
  @IsEmail()
  email!: string;
}
