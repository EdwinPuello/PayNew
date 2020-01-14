import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private Storage:AngularFireStorage,private afs:AngularFirestore,private _snackBar: MatSnackBar) { }


  registerUser(value,datos){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then( res => {
        this.updateUserSendInfo(res,datos)
        resolve(res)},
        err => reject(err))
    })
   }

   updateUserSendInfo(res,data){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${res.user.uid}`)
    const datos = {
      id: res.user.uid,
      nombreCompleto: data.nombreCompleto,
      documento: data.documento,
      dinero: data.dinero
    }
    return userRef.set(datos,{merge:true})
  }

  sendMoney(uid,data){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`)
    const datos = {
      id: uid,
      nombreCompleto: data.nombreCompleto,
      documento: data.documento,
      dinero: data.dinero
    }
    return userRef.set(datos,{merge:true})
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.correo, value.password).then(res=>{
        resolve(res)
      },async erro=>{
        reject(erro)
      })
    })
   }

   buscarPorDocumento(documento){
    this.afs.collection("users").valueChanges().subscribe((data:any)=>{
       let result = data.filter(data => {
         return data.documento == documento
       })
       console.log(result)
    })
   }



   userDetails(){
    return firebase.auth().currentUser;
  }

  getInfoUser(userId){
    //  return this.afs.collection('users').doc(userId).snapshotChanges()
      return this.afs.doc(`users/${userId}`).valueChanges()
   }

   forgotPassword(email){
    firebase.auth().sendPasswordResetEmail(email).then(async ()=>{
      this._snackBar.open('Hemos enviado un correo con la información necesaria para restablecer su contraseña', 'ok', {
        duration: 2000,
      });
    },async erro=>{
      this._snackBar.open('Ocurrio un error', 'ok', {
        duration: 2000,
      });
    })
  }

}
