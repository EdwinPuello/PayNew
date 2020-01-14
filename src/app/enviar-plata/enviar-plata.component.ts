import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enviar-plata',
  templateUrl: './enviar-plata.component.html',
  styleUrls: ['./enviar-plata.component.css']
})

export class EnviarPlataComponent implements OnInit {
  
  form = new FormGroup({
    documento: new FormControl('',Validators.required),
    dinero: new FormControl('',[Validators.required])
  })
  resultado:any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar,private afs:AngularFirestore,public api:AuthServiceService,public dialog: MatDialog) { 
    console.log(data)
    this.form.controls.dinero.setValidators(Validators.max(this.data.miinfo.dinero))
  }

  ngOnInit() {
  }
  
  enviar(){
    if(this.form.controls.documento.value == parseInt(this.data.miinfo.documento)){
      Swal.fire({
        title:'Acción incorrecta',
        text:'No te puedes enviar dinero a ti mismo',
        icon:'question'
      })
    }else{
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Al aceptar se enviaran "+this.form.controls.dinero.value+" a "+this.resultado[0].nombreCompleto,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Si, Enviar dinero'
      }).then((result) => {
        if (result.value) {
  
        
            let data = {
              nombreCompleto:this.resultado[0].nombreCompleto,
              documento:this.resultado[0].documento,
              dinero: parseInt(this.form.controls.dinero.value) + parseInt(this.resultado[0].dinero)
            }
            let data2 = {
              nombreCompleto:this.data.miinfo.nombreCompleto,
              documento:this.data.miinfo.documento,
              dinero: parseInt(this.data.miinfo.dinero) - parseInt(this.form.controls.dinero.value)
            }
            this.api.sendMoney(this.data.miinfo.id,data2).then(d=>{
              this.api.sendMoney(this.resultado[0].id,data).then(d=>{
                this.dialog.closeAll()
                this._snackBar.open('Dinero enviado exitosamente', 'ok', {
                  duration: 2000,
                });
              })
            })
          
        }
      })
    }
  }

  buscar(){
    Swal.fire({ onBeforeOpen: ()=> { Swal.showLoading() }, allowOutsideClick:false, allowEscapeKey:false, text:'Iniciando sesión...' })
    this.afs.collection("users").valueChanges().subscribe((data:any)=>{
      let result = data.filter(data => {
        return data.documento == this.form.controls.documento.value
      })
      Swal.close()
      this.resultado = result
      console.log(result)
   },erro=>[
     Swal.close()
   ])

    // this.api.buscarPorDocumento(this.form.controls.documento.value)
  }

}
