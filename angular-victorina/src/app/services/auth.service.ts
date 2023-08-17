import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import * as auth from 'firebase/auth';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public NgZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string): Promise<boolean> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['home']);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result && result.user) {
          // Set the username in the user's profile
          return result.user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              // Now that the profile update is complete, update Firestore document
              this.SetUserData(result.user);
              this.router.navigate(['home']);
            });
        } else {
          // Handle the case where result or result.user is undefined
          throw new Error('User creation failed');
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // photoUrl:user.photoUrl
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user !== null) {
      return true;
    }
    return false;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user'), this.router.navigate(['home']);
    });
  }
  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const result = await this.afAuth.fetchSignInMethodsForEmail(email);

      return result.length > 0;
    } catch (error) {
      return false;
    }
  }
  getDisplayName() {
    return this.userData.displayName;
  }
}
