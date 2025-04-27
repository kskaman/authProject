import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";

import { auth } from "../../firebase";

export async function signUpUser(email:string, password: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password, 
    
  );
  
  // Send email verification
  await sendEmailVerification(userCredential.user);
  return userCredential;
}

export async function signInUser(email:string, password:string): Promise<UserCredential> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
}

export async function forgotPassword(email: string) : Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function resendEmailVerification(user: User): Promise<void> {
  await sendEmailVerification(user);
}