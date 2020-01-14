import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EnviarPlataComponent } from '../enviar-plata/enviar-plata.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecargarPlataComponent } from '../recargar-plata/recargar-plata.component';

@Component({
  selector: 'app-pasar-plata',
  templateUrl: './pasar-plata.component.html',
  styleUrls: ['./pasar-plata.component.css']
})
export class PasarPLataComponent implements OnInit {
  infouser: any = [];
  constructor(public api:AuthServiceService,public ruta:Router,public dialog: MatDialog) {
    this.getinfo()
   }
  getinfo(){
    this.api.getInfoUser(localStorage.getItem('uid')).subscribe((data:any)=>{
      console.log(data);
      this.infouser = data
    })
  }
  login(){
    localStorage.clear()
    this.ruta.navigate(['/login'])
  }

  recargar(){
    const dialogRef = this.dialog.open(RecargarPlataComponent, {
      width: '80%',
      data:{miinfo:this.infouser}
    });

    dialogRef.afterClosed().subscribe(result => {
    //  this.getinfo()
    }); 
  }

  enviarPlata(){
    const dialogRef = this.dialog.open(EnviarPlataComponent, {
      width: '80%',
      data:{miinfo:this.infouser}
    });

    dialogRef.afterClosed().subscribe(result => {
    //  this.getinfo()
    });
  }
  ngOnInit() {
  }

}
