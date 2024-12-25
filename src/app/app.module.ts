import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    MatIconModule, 
    AppComponent,
    FormsModule,
    BrowserAnimationsModule  // Ajout du module MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
