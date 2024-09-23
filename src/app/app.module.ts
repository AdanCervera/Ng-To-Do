import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from "primeng/contextmenu";
import { TagModule } from 'primeng/tag';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    AppRoutingModule,
    InputTextModule, 
    FloatLabelModule,
    ButtonModule,
    TableModule, 
    ContextMenuModule, 
    TagModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    ConfirmationService,MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
