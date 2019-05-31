import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';

@Injectable()
export class UsersService {
  private users = new Map<string, User>();

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByToken(token: string): Promise<User | undefined> {
    return this.users.get(token);
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async deleteAll() {
    return this.usersRepository.clear();
  }

  async addOne(user: User): Promise<User> {
    return this.usersRepository.save([user]).then(users => users[0]);
  }

  async delete(user: User) {
    return (await this.usersRepository.remove([user]))[0];
  }

  async save(user: User) {
    return (await this.usersRepository.save([user]))[0];
  }

  async isEmailExisting(email: string): Promise<boolean> {
    return this.usersRepository.count({ email }).then(count => count > 0);
  }
}
