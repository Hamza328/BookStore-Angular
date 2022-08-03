import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './Auth/login/login.component';
import { BookComponent } from './User/buy-book/book.component';
import { PurchasedBookComponent } from './User/purchased-book/purchased-book.component';
import { TokenInterceptor } from './shared/token.interceptor';
import { AllBookComponent } from './Admin/all-book/all-book.component';
import { EditBookComponent } from './Admin/edit-book/edit-book.component';
import { AdminComponent } from './Admin/admin-component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeaderComponent,
    BookComponent,
    PurchasedBookComponent,
    AllBookComponent,
    EditBookComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
