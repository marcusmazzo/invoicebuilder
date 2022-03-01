import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from '../tokeninterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule

  ], 
  exports: [ 
    
  ],
  providers : [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class UsersModule { }
