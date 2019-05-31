import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../db', 'db.sqlite'),
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '../db/migrations/*{.ts,.js}')],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
