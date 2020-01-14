import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(5)]),
    documento: new FormControl('',[Validators.required,Validators.minLength(5)]),
    correo: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  constructor(public api:AuthServiceService,public ruta:Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  registro(){

    Swal.fire({ onBeforeOpen: ()=> { Swal.showLoading() }, allowOutsideClick:false, allowEscapeKey:false, text:'Cargando...' })
    let data = {
      email: this.form.controls.correo.value,
      password: this.form.controls.password.value,
    }
    let datos = {
      nombreCompleto: this.form.controls.nombre.value,
      documento: this.form.controls.documento.value,
      dinero: 0
    }
    this.api.registerUser(data,datos).then(d=>{
      Swal.close()
      this._snackBar.open('Registro exitoso', 'ok', {
        duration: 2000,
      });
      this.ruta.navigate(['/login'])
    },erro=>{
      this._snackBar.open('Ocurrio un error', 'ok', {
        duration: 2000,
      });
      Swal.close()
    })
  }

}
