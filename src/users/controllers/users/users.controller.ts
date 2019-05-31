import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Put,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { CreateUserDto } from '../../models/create-user.dto';
import { UpdateUserDto } from '../../models/update-user.dto';
import { User } from '../../user.entity';
import { CheckEmailQuery } from '../../check-email-query';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Delete()
  deleteAll() {
    return this.usersService.deleteAll();
  }

  @Get('check-email')
  async checkEmailAvailable(@Query() checkEmailQuery: CheckEmailQuery) {
    return this.usersService
      .isEmailExisting(checkEmailQuery.email)
      .then(exists => {
        return { email: checkEmailQuery.email, available: !exists };
      });
  }

  @Post()
  async craete(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto:', createUserDto);
    const user = new User();
    Object.assign(user, createUserDto);
    return this.usersService.save(user);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return this.usersService.save(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersService.delete(user);
  }
}
