import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { HttpStrategy } from './services/http.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthService, HttpStrategy],
})
export class AuthModule {}
