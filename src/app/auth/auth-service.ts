import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { ILoginPayload, ISignupPayload, IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  user = signal<IUser | null | undefined>(undefined);

  async signup(payload: ISignupPayload): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      payload.email,
      payload.password
    );

    return updateProfile(userCredential.user, {
      displayName: payload.username,
    });
  }

  login(payload: ILoginPayload): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.firebaseAuth,
      payload.email,
      payload.password
    );
  }

  logout(): Promise<void> {
    return signOut(this.firebaseAuth);
  }
}
