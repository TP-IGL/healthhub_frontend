import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    MatIconModule, 
    AppComponent, // Ajout du module MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
