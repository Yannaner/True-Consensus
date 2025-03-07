// filepath: c:\Users\2005f\Desktop\VScode\TrueConsensus\backend\src\app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'trueconsensus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    FirebaseModule,
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}