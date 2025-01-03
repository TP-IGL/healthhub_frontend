import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store';
import { authReducer } from './services/auth/auth.reducer';
import { AuthService } from './services/auth/auth.service';
import { QRCodeComponent } from 'angularx-qrcode';
@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    MatIconModule, 
    AppComponent,
    FormsModule,
    StoreModule.forRoot({ auth : authReducer }),
    BrowserAnimationsModule , 
    BrowserAnimationsModule ,
    QRCodeComponent
   // Ajout du module MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
