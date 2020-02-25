import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../material.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    MatToolbarModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    NavbarComponent
  ]
})
export class SharedModule { }
