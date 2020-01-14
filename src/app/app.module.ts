import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PasarPLataComponent } from './pasar-plata/pasar-plata.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { AuthServiceService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { EnviarPlataComponent } from './enviar-plata/enviar-plata.component';
import { RecargarPlataComponent } from './recargar-plata/recargar-plata.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,

    PasarPLataComponent,
    MiPerfilComponent,
    RegistroComponent,
    EnviarPlataComponent,
    RecargarPlataComponent,
  ],
  imports: [
    MatDialogModule,
    MatMenuModule,
    AngularFireAuthModule,
    MatButtonModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    AngularFireDatabaseModule,
    MatInputModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  entryComponents:[EnviarPlataComponent,RecargarPlataComponent],
  providers: [AuthServiceService, { provide: FirestoreSettingsToken, useValue: {} },AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
