import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(token: string): Promise<User | undefined> {
    return this.usersService.findOneByToken(token);
  }
}
