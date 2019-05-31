import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UniqueEntityConstraint } from './unique-entity-constraint';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UniqueEntityConstraint],
  controllers: [UsersController],
  exports: [UsersService, UniqueEntityConstraint],
})
export class UsersModule {}
