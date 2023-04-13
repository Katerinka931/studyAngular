import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupDataComponent } from './components/group-data/group-data.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AuthGuard} from "./guards/auth.guard";
import { RegisterComponent } from './components/register/register.component';
import {authInterceptorProviders} from "./helpers/basic-auth.interceptor";
import {errorInterceptorProviders} from "./helpers/http-error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    GroupsListComponent,
    GroupDataComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    authInterceptorProviders,
    errorInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
