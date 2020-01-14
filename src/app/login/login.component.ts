import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form = new FormGroup({
    correo: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  constructor(public api:AuthServiceService,private _snackBar: MatSnackBar,public ruta:Router) { }

  ngOnInit() {
  }

  login(){
    Swal.fire({ onBeforeOpen: ()=> { Swal.showLoading() }, allowOutsideClick:false, allowEscapeKey:false, text:'Iniciando sesión...' })
    let data = {
      correo :this.form.controls.correo.value,
      password:this.form.controls.password.value
    }
    this.api.loginUser(data).then(d=>{
      Swal.close()
      console.log(d);
      localStorage.setItem('uid',d.user.uid)
      this._snackBar.open('Login exitoso', 'ok', {
        duration: 2000,
      });
      this.ruta.navigate(['/profile'])
    }).catch(d=>{
      Swal.close()
      this._snackBar.open('Usuario o contreseña incorrectas', 'ok', {
        duration: 2000,
      });
    })
  }

  resetpassword(){
    if(this.form.controls.correo.valid){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Al aceptar se enviara una serie de pasos a tu correo electronico para restablecer tu contraseña",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Si, restablecer contraseña'
      }).then((result) => {
        if (result.value) {

          this.api.forgotPassword(this.form.controls.correo.value)
        }
      })
    }else{
      Swal.fire({
        text:'Para inicar el proceso de restablecimiento de contraseña debe estar completo el campo de correo electronico',
        icon:'question'
      })
    }
  }

}
