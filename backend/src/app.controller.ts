import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('signup')
  async signup(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    const userCredential = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
    return userCredential.user;
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    const userCredential = await signInWithEmailAndPassword(this.firebaseService.auth, email, password);
    return userCredential.user;
  }
}