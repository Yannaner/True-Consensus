import { Injectable, OnModuleInit } from '@nestjs/common';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { join } from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    dotenv.config({ path: join(process.cwd(), '.env') });

    // Check if Firebase Admin has already been initialized
    console.log("initializing firebase admin with projectid: ", process.env.FIREBASE_PROJECT_ID);
    if (!admin.apps.length) {
        admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
            credential: admin.credential.applicationDefault(),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
          });
              }
  }

  getAuth() {
    return admin.auth();
  }
}
