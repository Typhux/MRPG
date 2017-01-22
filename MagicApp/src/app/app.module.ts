//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MapModule } from './map-module/map.module';

//Components
import { AppComponent } from './app.component';

//bootstrap
import { AlertModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MapModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
