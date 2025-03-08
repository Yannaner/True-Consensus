import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }
    
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"
    console.log("Token: ", token);
    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      // Add the decoded token to the request object so controllers can access it
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        // Add any other claims you might need
      };
      return true;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
