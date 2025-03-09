import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() body: { email: string, password: string, first_name: string, last_name: string }) {
    const { email, password, first_name, last_name } = body;
    const userCredential = await this.firebaseService.auth.createUserWithEmailAndPassword(email, password);
    const firebaseUserId = userCredential.user.uid;

    // Create user in PostgreSQL database
    const createUserDto: CreateUserDto = { first_name, last_name, email };
    await this.usersService.create(createUserDto, firebaseUserId);

    return userCredential.user;
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    const userCredential = await this.firebaseService.auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('verify')
  async verify(@Req() req) {
    return req.user;
  }
}