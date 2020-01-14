import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recargar-plata',
  templateUrl: './recargar-plata.component.html',
  styleUrls: ['./recargar-plata.component.css']
})
export class RecargarPlataComponent implements OnInit {

  form = new FormGroup({
    recarga: new FormControl('',Validators.required)
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar,private afs:AngularFirestore,public api:AuthServiceService,public dialog: MatDialog) { 
    console.log(data);
  }


  recargar(){
    Swal.fire({ onBeforeOpen: ()=> { Swal.showLoading() }, allowOutsideClick:false, allowEscapeKey:false, text:'Cargando...' })
    let data2 = {
      nombreCompleto:this.data.miinfo.nombreCompleto,
      documento:this.data.miinfo.documento,
      dinero: parseInt(this.data.miinfo.dinero) + parseInt(this.form.controls.recarga.value)
    }

    this.api.sendMoney(this.data.miinfo.id,data2).then(d=>{
      Swal.close()
        this.dialog.closeAll()
        this._snackBar.open('Recarga exitosa', 'ok', {
          duration: 2000,
      })
    }).catch(d=>{
      Swal.close()
    })

  }

  ngOnInit() {
  }

}
