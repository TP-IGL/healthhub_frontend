import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    MatIconModule, 
    AppComponent, // Ajout du module MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
