import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(data => this.authState = data)
  }
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  get authenticated(): boolean {
    return this.authState !==null
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null
  }
  
login(){
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

logout(){
  this.afAuth.auth.signOut()
}

}

